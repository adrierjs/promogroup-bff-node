class IndexController {
  constructor() {}

  async getProductsByCategory(req, res, category) {
    const query = `
      SELECT dados_json
      FROM DATA_SCRAPING
      WHERE EXISTS (
        SELECT 1
        FROM jsonb_array_elements(dados_json) AS elem
        WHERE elem->>'category' = $1
      )
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    await this.executeQuery(req, res, query, [category]);
  }

  async getNotebooks(req, res) {
    await this.getProductsByCategory(req, res, 'notebook');
  }

  async getCelulares(req, res) {
    await this.getProductsByCategory(req, res, 'celular');
  }

  async getTvs(req, res) {
    await this.getProductsByCategory(req, res, 'tv');
  }

  async getGeladeiras(req, res) {
    await this.getProductsByCategory(req, res, 'geladeira');
  }

  async getArcondicionados(req, res) {
    await this.getProductsByCategory(req, res, 'ar');
  }

  async getLivros(req, res) {
    await this.getProductsByCategory(req, res, 'livros');
  }

  async executeQuery(req, res, query, params) {
    try {
      const { clienteBancoDeDados } = req;
      if (clienteBancoDeDados) {
        const resultadoConsulta = await clienteBancoDeDados.query(query, params);

        res.status(200).json(resultadoConsulta.rows);
      } else {
        res.status(500).send('Erro: Cliente do banco de dados não disponível.');
      }
    } catch (error) {
      console.error('Erro ao executar consulta:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }
}

export default new IndexController();
