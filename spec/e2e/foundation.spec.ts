import { expect, test } from '@playwright/test'

test('opens the technical page and performs an Inertia visit', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page).toHaveTitle('Umanni')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { name: 'Umanni', level: 1 })).toBeVisible()
  await expect(page.getByText('Versão 0.2.0')).toBeVisible()
  await expect(page.getByText('Fundação técnica. Cadastro, login e gestão de usuários ainda não estão disponíveis.')).toBeVisible()
  const visit = page.waitForResponse(response => response.request().headers()['x-inertia'] === 'true')
  await page.getByRole('link', { name: 'Recarregar página' }).click()
  const response = await visit
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.component).toBe('Foundation/Show')
  expect(body.props).toEqual({ app: { name: 'Umanni', version: '0.2.0' }, errors: {} })
  expect(errors).toEqual([])
})

test('reloads the document after a real asset version mismatch', async ({ page }) => {
  await page.goto('/')
  await page.route('**/*', async route => {
    const headers = route.request().headers()
    if (headers['x-inertia'] === 'true') headers['x-inertia-version'] = 'outdated'
    await route.continue({ headers })
  })
  const conflict = page.waitForResponse(response => response.status() === 409)
  const reload = page.waitForRequest(request => request.isNavigationRequest())
  await page.getByRole('link', { name: 'Recarregar página' }).click()
  expect((await conflict).headers()['x-inertia-location']).toBeTruthy()
  await reload
  await expect(page.getByRole('heading', { name: 'Umanni' })).toBeVisible()
})
