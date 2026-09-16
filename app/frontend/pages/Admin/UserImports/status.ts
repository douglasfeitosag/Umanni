const labels: Record<string, string> = {
  queued: 'Na fila',
  processing: 'Processando',
  completed: 'Concluída',
  completed_with_errors: 'Concluída com erros',
  failed: 'Falhou',
}

const resultLabels: Record<string, string> = {
  created: 'Criada',
  rejected: 'Rejeitada',
}

export function importStatusLabel(status: string) {
  return labels[status] ?? 'Estado indisponível'
}

export function importResultLabel(status: string) {
  return resultLabels[status] ?? 'Resultado indisponível'
}
