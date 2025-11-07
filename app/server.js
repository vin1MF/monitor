// Importa o Express e o client do Prometheus
const express = require('express');
const client = require('prom-client');

// Cria uma aplicação Express
const app = express();
const port = 3000;

// Cria um registro de métricas
const register = new client.Registry();

// Define uma métrica personalizada (contador)
const requestCount = new client.Counter({
  name: 'app_request_count',
  help: 'Número total de requisições recebidas',
});

// Adiciona a métrica ao registro
register.registerMetric(requestCount);

// Middleware para contar cada requisição
app.use((req, res, next) => {
  requestCount.inc(); // Incrementa o contador
  next();
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Olá! Essa aplicação expõe métricas para o Prometheus.');
});

// Rota de métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
