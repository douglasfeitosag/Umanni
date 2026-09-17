import { expect, test } from '@playwright/test'

const technicalDetails = /sensitive-|RuntimeError|DeliveryErrorProbeController|backtrace|stacktrace/i

test('renders an accessible HTML fallback without technical details', async ({ page }) => {
  const response = await page.goto('/__delivery_error_probe__?secret=sensitive-query-sentinel')

  expect(response?.status()).toBe(500)
  await expect(page).toHaveTitle('Não foi possível concluir · Umanni')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  const heading = page.getByRole('heading', { name: 'Não foi possível concluir', level: 1 })
  await expect(heading).toBeFocused()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('body')).not.toContainText(technicalDetails)

  const action = page.getByRole('link', { name: 'Voltar ao início' })
  const box = await action.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.width).toBeGreaterThanOrEqual(44)
  expect(box!.height).toBeGreaterThanOrEqual(44)

  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

  await action.click()
  await expect(page).toHaveURL(/\/sign-in$/)
})

test('handles a real Inertia failure without opening an invalid-response dialog', async ({ page }) => {
  await page.goto('/sign-up')
  await page.getByLabel('Nome completo').fill('Pessoa de Teste')
  await page.getByLabel('E-mail').fill('delivery-probe@example.com')
  await page.getByLabel('Senha', { exact: true }).fill('sensitive-password-sentinel')
  await page.getByLabel('Confirmar senha').fill('sensitive-password-sentinel')

  const failure = page.waitForResponse(response => response.url().endsWith('/sign-up') && response.request().method() === 'POST')
  await page.getByRole('button', { name: 'Criar conta' }).click()

  expect((await failure).status()).toBe(500)
  await expect(page).toHaveTitle('Não foi possível concluir · Umanni')
  await expect(page.getByRole('heading', { name: 'Não foi possível concluir', level: 1 })).toBeFocused()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('body')).not.toContainText(technicalDetails)
})

test('keeps validation failures on the existing 422 path', async ({ page }) => {
  await page.goto('/sign-up')
  await page.getByLabel('Nome completo').fill('Pessoa de Teste')
  await page.getByLabel('E-mail').fill('invalid')
  await page.getByLabel('Senha', { exact: true }).fill('short')
  await page.getByLabel('Confirmar senha').fill('different')

  const validation = page.waitForResponse(response => response.url().endsWith('/sign-up') && response.request().method() === 'POST')
  await page.getByRole('button', { name: 'Criar conta' }).click()

  expect((await validation).status()).toBe(422)
  await expect(page).toHaveURL(/\/sign-up$/)
  await expect(page.getByLabel('E-mail')).toHaveAttribute('aria-invalid', 'true')
})
