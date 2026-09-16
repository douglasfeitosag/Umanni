const labels: Record<string, string> = {
  queued: 'Na fila',
  processing: 'Processando',
  completed: 'Concluída',
  completed_with_errors: 'Concluída com erros',
  failed: 'Falhou',
}

export function importStatusLabel(status: string) {
  return labels[status] ?? 'Estado indisponível'
}
