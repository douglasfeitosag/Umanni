import { expect, test } from '@playwright/test'

test('opens the sign-in page and performs an Inertia visit', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page).toHaveTitle('Entrar · Umanni')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { name: 'Entre na sua conta', level: 1 })).toBeVisible()
  const visit = page.waitForResponse(response => response.request().headers()['x-inertia'] === 'true')
  await page.getByRole('link', { name: 'Cadastre-se' }).click()
  const response = await visit
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.component).toBe('Auth/SignUp')
  expect(body.props).toEqual({ auth: { user: null }, errors: {}, flash: {} })
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
  await page.getByRole('link', { name: 'Cadastre-se' }).click()
  expect((await conflict).headers()['x-inertia-location']).toBeTruthy()
  await reload
  await expect(page.getByRole('heading', { name: 'Crie sua conta' })).toBeVisible()
})
