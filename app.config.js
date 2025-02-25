export default ({ config }) => {
    return {
      ...config,
      extra: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        // Adicione outras variáveis conforme necessário
      },
    };
  };
  