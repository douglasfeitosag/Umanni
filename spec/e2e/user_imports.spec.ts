import { expect, test, type Page, type TestInfo } from '@playwright/test'

const adminEmail = 'admin@umanni.local'
const adminPassword = 'uma senha admin segura'
const initialPassword = 'uma frase segura'

function uniqueEmail(testInfo: TestInfo, label: string) {
  const nonce = `${testInfo.project.name}-${testInfo.workerIndex}-${Date.now()}-${Math.random()}`.replace(/[^a-z0-9]/gi, '')
  return `${label}-${nonce}@example.com`.toLowerCase()
}

async function login(page: Page, email: string, password: string) {
  await page.goto('/sign-in')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(password)
  await page.getByRole('button', { name: 'Entrar' }).click()
}

test('US1–US6 imports a CSV with the real worker, persists progress, and activates the imported account once', async ({ browser, page }, testInfo) => {
  const importedEmail = uniqueEmail(testInfo, 'imported')
  await login(page, adminEmail, adminPassword)
  await page.getByRole('link', { name: 'Importações' }).click()
  await page.getByLabel('Arquivo de importação').setInputFiles({
    name: 'people.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from(`full_name,email,role\nPessoa Importada,${importedEmail},regular\n`),
  })
  await page.getByRole('button', { name: 'Enviar para importação' }).click()
  await expect(page).toHaveURL(/\/admin\/user_imports\/\d+$/)
  await expect.poll(async () => {
    await page.reload()
    return (await page.getByText('1 de 1 linhas processadas.').isVisible()) &&
      (await page.getByText('Concluída').isVisible())
  }).toBe(true)
  await expect(page.getByRole('table', { name: 'Resultados por linha' })).toContainText(importedEmail)

  await page.getByRole('link', { name: 'Pessoas' }).click()
  await page.getByRole('row').filter({ hasText: importedEmail }).getByRole('link', { name: 'Editar' }).click()
  await expect(page.getByRole('heading', { name: 'Definir senha inicial' })).toBeVisible()
  await page.getByLabel('Senha inicial para acesso', { exact: true }).fill(initialPassword)
  await page.getByLabel('Confirmar senha inicial para acesso').fill(initialPassword)
  await page.getByRole('button', { name: 'Definir senha inicial' }).click()
  await expect(page.getByRole('button', { name: 'Definir senha inicial' })).toHaveCount(0)
  expect(await page.content()).not.toContain(initialPassword)

  await page.getByRole('button', { name: 'Sair' }).click({ force: true })
  await login(page, importedEmail, initialPassword)
  await expect(page).toHaveURL(/\/profile$/)

  const regularContext = await browser.newContext()
  const regularPage = await regularContext.newPage()
  const regularEmail = uniqueEmail(testInfo, 'regular')
  await regularPage.goto('/sign-up')
  await regularPage.getByLabel('Nome completo').fill('Pessoa Regular')
  await regularPage.getByLabel('E-mail').fill(regularEmail)
  await regularPage.getByLabel('Senha', { exact: true }).fill(initialPassword)
  await regularPage.getByLabel('Confirmar senha').fill(initialPassword)
  await regularPage.getByRole('button', { name: 'Criar conta' }).click()
  await expect(regularPage).toHaveURL(/\/profile$/)
  const denied = await regularPage.request.get('/admin/user_imports')
  expect(denied?.status()).toBe(403)
  await regularContext.close()
})

test('US1 keeps the import form and populated history readable at supported viewport and text sizes', async ({ page }, testInfo) => {
  const importedEmail = uniqueEmail(testInfo, 'layout')
  const projectName = testInfo.project.name.replace(/[^a-z0-9]/gi, '')
  const filename = `l-${projectName}-${Date.now().toString(36)}.csv`
  await login(page, adminEmail, adminPassword)
  await page.getByRole('link', { name: 'Importações' }).click()
  await page.getByLabel('Arquivo de importação').setInputFiles({
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(`full_name,email,role\nPessoa de Layout,${importedEmail},regular\n`),
  })
  await page.getByRole('button', { name: 'Enviar para importação' }).click()
  await expect(page).toHaveURL(/\/admin\/user_imports\/\d+$/)
  await page.goto('/admin/user_imports')
  await expect(page.getByRole('link', { name: filename })).toBeVisible()

  for (const { width, fontSize } of [{ width: 1440, fontSize: '100%' }, { width: 320, fontSize: '100%' }, { width: 320, fontSize: '200%' }]) {
    await page.setViewportSize({ width, height: 1024 })
    await page.locator('html').evaluate((element, size) => { element.style.fontSize = size }, fontSize)

    const layout = await page.locator('[data-testid="import-upload"]').evaluate((upload, viewportWidth) => {
      const hint = upload.querySelector('#source-file-hint')!.getBoundingClientRect()
      const button = upload.querySelector('button')!.getBoundingClientRect()
      const history = document.querySelector('[data-testid="import-history"]')!.getBoundingClientRect()
      return { hintBottom: hint.bottom, buttonTop: button.top, buttonBottom: button.bottom, historyTop: history.top, scrollWidth: document.documentElement.scrollWidth, viewportWidth }
    }, width)

    expect(layout.hintBottom).toBeLessThanOrEqual(layout.buttonTop)
    expect(layout.buttonBottom).toBeLessThanOrEqual(layout.historyTop)
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth)
  }
})

test('US2 keeps a missing import file in the browser without a POST', async ({ page }) => {
  await login(page, adminEmail, adminPassword)
  await page.getByRole('link', { name: 'Importações' }).click()
  let posts = 0
  page.on('request', request => {
    if (request.method() === 'POST' && new URL(request.url()).pathname === '/admin/user_imports') posts += 1
  })

  await page.getByRole('button', { name: 'Enviar para importação' }).click()

  await expect(page.getByText('Selecione um arquivo CSV ou XLSX.')).toBeVisible()
  await expect(page.getByLabel('Arquivo de importação')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByLabel('Arquivo de importação')).toHaveAttribute('aria-describedby', 'source-file-hint source-file-error')
  expect(posts).toBe(0)
})
