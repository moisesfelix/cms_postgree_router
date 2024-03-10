const { findNearestNeighbor } = require("../utils")

const getTheBestRoutes = async (req, res) => {
    try {
        const { startPoint, clientsData, pointsByRoute, numDrivers } = req.body;

        // Copia os dados dos clients para não modificar o original
        let remainingClients = clientsData.map(client => ({ ...client, visited: false }));

        // Calculando as rotas para cada motorista
        const routes = [];
        for (let i = 0; i < numDrivers; i++) {
            const route = [];
            route.push(startPoint); // Adicionando ponto de partida
            let currentPoint = startPoint;
            for (let j = 0; j < pointsByRoute; j++) { // -1 para deixar espaço para o ponto de partida
                // Encontrando o próximo client mais próximo
                const nextClient = findNearestNeighbor(currentPoint, remainingClients);
                if (nextClient) {
                    route.push(nextClient);
                    currentPoint = nextClient;
                } else {
                    break; // Sai do loop se não houver mais clients para visitar
                }
            }
            routes.push(route);

            // Se não houver mais clients não visitados, pare de calcular as rotas
            if (remainingClients.every(client => client.visited)) {
                break;
            }
        }

        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getTheBestRoutes };
