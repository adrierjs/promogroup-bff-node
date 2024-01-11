// indexController.js
class IndexController {
  constructor() {}

  async getNotebooks(req, res) {
    await this.executeQuery(req, res, `
    SELECT *
    FROM DATA_SCRAPING
    WHERE dados_json IS NOT NULL
      AND CAST(dados_json AS jsonb) <> '[]'::jsonb
      AND (SELECT COUNT(*) FROM jsonb_array_elements(dados_json) as product WHERE product->>'category' = 'notebook') > 0
    ORDER BY created_at DESC
    LIMIT 1;
    `);
  }

  async getCelulares(req, res){
    await this.executeQuery(req, res, `
    SELECT *
    FROM DATA_SCRAPING
    WHERE dados_json IS NOT NULL
      AND CAST(dados_json AS jsonb) <> '[]'::jsonb
      AND (SELECT COUNT(*) FROM jsonb_array_elements(dados_json) as product WHERE product->>'category' = 'celular') > 0
    ORDER BY created_at DESC
    LIMIT 1;
    `);
  }

  async getTvs(req, res){
    await this.executeQuery(req, res, `
    SELECT *
    FROM DATA_SCRAPING
    WHERE dados_json IS NOT NULL
      AND CAST(dados_json AS jsonb) <> '[]'::jsonb
      AND (SELECT COUNT(*) FROM jsonb_array_elements(dados_json) as product WHERE product->>'category' = 'tv') > 0
    ORDER BY created_at DESC
    LIMIT 1;
    `);
  }

  async getGeladeiras(req, res) {
    await this.executeQuery(req, res, `
    SELECT *
    FROM DATA_SCRAPING
    WHERE dados_json IS NOT NULL
      AND CAST(dados_json AS jsonb) <> '[]'::jsonb
      AND (SELECT COUNT(*) FROM jsonb_array_elements(dados_json) as product WHERE product->>'category' = 'geladeira') > 0
    ORDER BY created_at DESC
    LIMIT 1;
    `);
  }

  async getArcondicionados(req, res) {
    await this.executeQuery(req, res, `
    SELECT *
    FROM DATA_SCRAPING
    WHERE dados_json IS NOT NULL
      AND CAST(dados_json AS jsonb) <> '[]'::jsonb
      AND (SELECT COUNT(*) FROM jsonb_array_elements(dados_json) as product WHERE product->>'category' = 'ar') > 0
    ORDER BY created_at DESC
    LIMIT 1;
    `);
  }

  async getLivros(req, res) {
    await this.executeQuery(req, res, `
    SELECT *
    FROM DATA_SCRAPING
    WHERE dados_json IS NOT NULL
      AND CAST(dados_json AS jsonb) <> '[]'::jsonb
      AND (SELECT COUNT(*) FROM jsonb_array_elements(dados_json) as product WHERE product->>'category' = 'livros') > 0
    ORDER BY created_at DESC
    LIMIT 1;
    `);
  }

  async executeQuery(req, res, query) {
    try {
      const { clienteBancoDeDados } = req;
      if (clienteBancoDeDados) {
        const resultadoConsulta = await clienteBancoDeDados.query(query);

        res.status(200).json(resultadoConsulta.rows);
      }
      else {
        res.status(500).send('Erro: Cliente do banco de dados não disponível.');
      }
    } catch (error) {
      console.error('Erro ao executar consulta:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }
}

export default new IndexController();
