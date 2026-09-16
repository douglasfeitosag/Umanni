import { expect, test, type Page, type TestInfo } from '@playwright/test'

const adminEmail = 'admin@umanni.local'
const password = 'uma senha admin segura'

function uniqueEmail(testInfo: TestInfo, label: string) {
  const nonce = `${testInfo.project.name}-${testInfo.workerIndex}-${Date.now()}-${Math.random()}`.replace(/[^a-z0-9]/gi, '')
  return `${label}-${nonce}@example.com`.toLowerCase()
}

async function register(page: Page, email: string, fullName = 'Ana Silva') {
  await page.goto('/sign-up')
  await page.getByLabel('Nome completo').fill(fullName)
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha', { exact: true }).fill(password)
  await page.getByLabel('Confirmar senha').fill(password)
  await page.getByRole('button', { name: 'Criar conta' }).click()
  await expect(page).toHaveURL(/\/profile$/)
}

async function login(page: Page, email: string, loginPassword = password) {
  await page.goto('/sign-in')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(loginPassword)
  await page.getByRole('button', { name: 'Entrar' }).click()
}

async function logout(page: Page) {
  await page.getByRole('button', { name: 'Sair' }).click()
  await expect(page).toHaveURL(/\/sign-in$/)
}

test('US1.1–US1.3 registers only regular users and returns accessible validation', async ({ page }, testInfo) => {
  const email = uniqueEmail(testInfo, 'signup')
  await register(page, email)
  await expect(page.getByRole('heading', { name: 'Meu perfil' })).toBeVisible()
  await expect(page.getByText('Usuário regular')).toBeVisible()
  await expect(page.getByText(email)).toBeVisible()
  await logout(page)

  await page.goto('/sign-up')
  await expect(page.getByRole('combobox', { name: /papel/i })).toHaveCount(0)
  await page.getByLabel('Nome completo').fill('Duplicada')
  await page.getByLabel('E-mail').fill(`  ${email.toUpperCase()}  `)
  await page.getByLabel('Senha', { exact: true }).fill('short')
  await page.getByLabel('Confirmar senha').fill('different')
  await page.getByRole('button', { name: 'Criar conta' }).click()
  await expect(page.getByLabel('E-mail')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByLabel('Senha', { exact: true })).toHaveAttribute('aria-invalid', 'true')
  await expect(page).toHaveURL(/\/sign-up$/)
})

test('US2.1–US2.3 routes roles, keeps failures neutral and invalidates logout cookies', async ({ browser, page }, testInfo) => {
  const email = uniqueEmail(testInfo, 'session')
  await register(page, email)
  await logout(page)
  await login(page, email)
  await expect(page).toHaveURL(/\/profile$/)
  const oldCookie = (await page.context().cookies()).find(cookie => cookie.name === 'session_id')
  await logout(page)
  if (oldCookie) await page.context().addCookies([oldCookie])
  await page.goto('/profile')
  await expect(page).toHaveURL(/\/sign-in$/)

  await login(page, 'missing@example.com', 'senha completamente errada')
  await expect(page.getByRole('alert')).toContainText('E-mail ou senha inválidos.')

  const adminContext = await browser.newContext()
  const adminPage = await adminContext.newPage()
  let adminCableClosed = false
  adminPage.on('websocket', socket => {
    if (socket.url().endsWith('/cable')) socket.on('close', () => { adminCableClosed = true })
  })
  await login(adminPage, adminEmail)
  await expect(adminPage).toHaveURL(/\/admin\/dashboard$/)
  await logout(adminPage)
  await expect.poll(() => adminCableClosed).toBe(true)
  await adminContext.close()
})

test('US3.1–US3.3 edits only the own profile and supports confirmed deletion', async ({ page }, testInfo) => {
  const email = uniqueEmail(testInfo, 'profile')
  await register(page, email)
  await page.getByRole('link', { name: 'Editar perfil' }).click()
  await expect(page.getByLabel('Papel')).toHaveAttribute('readonly', '')
  const avatarInput = await page.getByLabel('Avatar').boundingBox()
  const avatarHint = await page.locator('#avatar-help').boundingBox()
  expect(avatarHint?.y).toBeGreaterThanOrEqual((avatarInput?.y ?? 0) + (avatarInput?.height ?? 0) + 4)
  await page.getByLabel('Nome completo').fill('Ana Atualizada')
  await page.getByRole('button', { name: 'Salvar alterações' }).click()
  await expect(page.getByRole('heading', { name: 'Meu perfil' })).toBeVisible()
  await expect(page.getByText('Ana Atualizada')).toBeVisible()

  await page.getByRole('button', { name: 'Excluir minha conta' }).click()
  await page.getByLabel('Confirmação').fill('EXCLUIR')
  await page.getByRole('button', { name: 'Excluir', exact: true }).click()
  await expect(page).toHaveURL(/\/sign-in$/)
  await login(page, email)
  await expect(page.getByRole('alert')).toContainText('E-mail ou senha inválidos.')
})

test('US4.1–US4.3 performs admin CRUD and denies the admin surface to regular users', async ({ browser, page }, testInfo) => {
  const email = uniqueEmail(testInfo, 'managed')
  await login(page, adminEmail)
  await page.getByRole('link', { name: 'Pessoas' }).click()
  await page.getByRole('link', { name: 'Adicionar pessoa' }).click()
  await page.getByLabel('Nome completo').fill('Pessoa Gerenciada')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Papel').selectOption('regular')
  await page.getByLabel('Senha inicial', { exact: true }).fill(password)
  await page.getByLabel('Confirmar senha inicial').fill(password)
  await page.getByRole('button', { name: 'Criar usuário' }).click()
  await expect(page).toHaveURL(/\/admin\/users$/)
  await expect(page.getByText(email)).toBeVisible()
  const row = page.getByRole('row').filter({ hasText: email })
  await row.getByRole('link', { name: 'Editar' }).click()
  await page.getByLabel('Papel').selectOption('admin')
  await page.getByRole('button', { name: 'Salvar alterações' }).click()
  await expect(page.getByRole('row').filter({ hasText: email }).getByText('Administrador')).toBeVisible()

  const regularContext = await browser.newContext()
  const regularPage = await regularContext.newPage()
  const regularEmail = uniqueEmail(testInfo, 'denied')
  await register(regularPage, regularEmail)
  expect((await regularPage.request.get('/admin/users')).status()).toBe(403)
  await regularContext.close()
})

test('US5.1–US5.3 accepts a valid avatar, rejects active content and preserves fallback', async ({ page }, testInfo) => {
  const email = uniqueEmail(testInfo, 'avatar')
  await register(page, email, 'Avatar Pessoa')
  await expect(page.getByRole('img', { name: 'Iniciais de Avatar Pessoa' })).toBeVisible()
  await page.getByRole('link', { name: 'Editar perfil' }).click()
  await page.locator('input[type="file"]').setInputFiles({ name: 'avatar.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nWQAAAAASUVORK5CYII=', 'base64') })
  await page.getByRole('button', { name: 'Salvar alterações' }).click()
  await expect(page.getByAltText('Avatar de Avatar Pessoa')).toBeVisible()
  await page.getByRole('link', { name: 'Editar perfil' }).click()
  await page.locator('input[type="file"]').setInputFiles({ name: 'attack.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg><script>alert(1)</script></svg>') })
  await page.getByRole('button', { name: 'Salvar alterações' }).click()
  await expect(page.getByText(/JPEG, PNG ou WebP válido/)).toBeVisible()
})

test('US7.1–US7.3 updates dashboard metrics through Cable, reload and reconnect', async ({ browser, page }, testInfo) => {
  await login(page, adminEmail)
  const demotedEmail = uniqueEmail(testInfo, 'demoted-admin')
  await page.getByRole('link', { name: 'Pessoas' }).click()
  await page.getByRole('link', { name: 'Adicionar pessoa' }).click()
  await page.getByLabel('Nome completo').fill('Admin Revogado')
  await page.getByLabel('E-mail').fill(demotedEmail)
  await page.getByLabel('Papel').selectOption('admin')
  await page.getByLabel('Senha inicial', { exact: true }).fill(password)
  await page.getByLabel('Confirmar senha inicial').fill(password)
  await page.getByRole('button', { name: 'Criar usuário' }).click()
  await page.getByRole('link', { name: 'Visão geral' }).click()
  const totalCard = page.getByText('Total de pessoas').locator('..').locator('strong')
  const initial = Number(await totalCard.textContent())

  const secondContext = await browser.newContext()
  const secondPage = await secondContext.newPage()
  await register(secondPage, uniqueEmail(testInfo, 'live'))
  await expect.poll(async () => Number(await totalCard.textContent())).toBeGreaterThan(initial)
  await page.reload()
  await expect(page.getByText('Ao vivo')).toBeVisible()
  await page.context().setOffline(true)
  await page.context().setOffline(false)
  await expect(page.getByText('Ao vivo')).toBeVisible()
  await secondContext.close()

  const demotedContext = await browser.newContext()
  const demotedPage = await demotedContext.newPage()
  let cableClosed = false
  demotedPage.on('websocket', socket => {
    if (socket.url().endsWith('/cable')) socket.on('close', () => { cableClosed = true })
  })
  await login(demotedPage, demotedEmail)
  await expect(demotedPage).toHaveURL(/\/admin\/dashboard$/)
  await page.getByRole('link', { name: 'Pessoas' }).click()
  await page.getByRole('row').filter({ hasText: demotedEmail }).getByRole('link', { name: 'Editar' }).click()
  await page.getByLabel('Papel').selectOption('regular')
  await page.getByRole('button', { name: 'Salvar alterações' }).click()
  await expect.poll(() => cableClosed).toBe(true)
  expect((await demotedPage.request.get('/admin/dashboard')).status()).toBe(403)
  await demotedContext.close()

  const deletedEmail = uniqueEmail(testInfo, 'deleted-admin')
  await page.getByRole('link', { name: 'Adicionar pessoa' }).click()
  await page.getByLabel('Nome completo').fill('Admin Excluído')
  await page.getByLabel('E-mail').fill(deletedEmail)
  await page.getByLabel('Papel').selectOption('admin')
  await page.getByLabel('Senha inicial', { exact: true }).fill(password)
  await page.getByLabel('Confirmar senha inicial').fill(password)
  await page.getByRole('button', { name: 'Criar usuário' }).click()
  const deletedContext = await browser.newContext()
  const deletedPage = await deletedContext.newPage()
  let deletedCableClosed = false
  deletedPage.on('websocket', socket => {
    if (socket.url().endsWith('/cable')) socket.on('close', () => { deletedCableClosed = true })
  })
  await login(deletedPage, deletedEmail)
  await expect(deletedPage).toHaveURL(/\/admin\/dashboard$/)
  const deletedRow = page.getByRole('row').filter({ hasText: deletedEmail })
  await deletedRow.getByRole('button', { name: `Excluir Admin Excluído` }).click()
  await page.getByLabel('Confirmação').fill('EXCLUIR')
  await page.getByRole('button', { name: 'Excluir', exact: true }).click()
  await expect.poll(() => deletedCableClosed).toBe(true)
  await deletedPage.reload()
  await expect(deletedPage).toHaveURL(/\/sign-in$/)
  await deletedContext.close()
})

test('NFR-002–NFR-003 preserves keyboard focus, reduced motion, short viewport and 200% text', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 640 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/sign-up')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.getByRole('link', { name: 'Pular para o conteúdo' }).press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)
  await expect(page.getByRole('button', { name: 'Criar conta' })).toBeVisible()
})

test('NFR-002 moves focus to the route heading and preserves 44px mobile navigation targets', async ({ page }) => {
  await login(page, adminEmail)
  await page.getByRole('link', { name: 'Pessoas' }).click()
  await expect(page.getByRole('heading', { name: 'Pessoas' })).toBeFocused()

  await page.setViewportSize({ width: 390, height: 844 })
  for (const link of await page.getByRole('navigation').getByRole('link').all()) {
    const box = await link.boundingBox()
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  }
})
