# Modelo dos artefatos visuais

Não descreve entidades da futura aplicação.

## SourceRecord

`id`, `url`, `publisher`, `consulted_at`, `content_type`, `sha256`, `license_status`, `notes`.

## BrandAsset

`id`, `variant`, `source_record_id`, `source_path`, `dimensions`, `color_space`, `alpha`, `transformation`, `output_hash`, `allowed_contexts`, `prohibited_changes`.

Transformações aceitas: preservação, renderização ou redimensionamento proporcional documentado; nunca redesenho/vetorização.

## DesignToken

`name`, `category`, `value`, `role`, `source` (observed/decided/adapted), `contrast_pair`, `contrast_ratio`, `constraints`.

Categorias: cor, tipografia, espaçamento, dimensão, raio, borda, sombra, foco, movimento e breakpoint.

## ComponentSpec

`name`, `purpose`, `anatomy`, `variants`, `states`, `content_rules`, `tokens`, `responsive_rules`, `accessibility`, `excluded_behavior`.

## StaticComposition

`name`, `viewport`, `components`, `sample_data`, `requirements`, `source_svg`, `rendered_png`, `inspection_result`.

Nomes permitidos: login-responsive, dashboard-desktop, users-desktop, import-desktop e users-mobile. Dados fictícios; nunca pessoas reais.

## ValidationEvidence

`id`, `artifact`, `method`, `expected`, `actual`, `executed_at`, `executor`, `result`.

## Relações

- BrandAsset referencia um SourceRecord.
- Token tem origem e, para texto/controle, contraste.
- ComponentSpec usa tokens existentes.
- StaticComposition usa apenas componentes especificados.
- Todo arquivo material possui ValidationEvidence.
