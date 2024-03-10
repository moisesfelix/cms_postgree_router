// Função para calcular a distância euclidiana entre dois pontos
function euclideanDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

// Função para encontrar o client mais próximo de um ponto
function findNearestNeighbor(point, clientsData) {
    // Calcula a distância entre o ponto e cada client
    const distances = clientsData.map(client => ({
        client,
        distance: euclideanDistance(point, client)
    }));

    // Ordena os clients pela distância do mais próximo ao mais distante
    distances.sort((a, b) => a.distance - b.distance);

    // Retorna o client mais próximo que ainda não foi visitado
    for (const { client } of distances) {
        if (!client.visited) {
            client.visited = true; // Marca o client como visitado
            return client;
        }
    }
    return null; // Retorna null se todos os clients já foram visitados
}

module.exports = { findNearestNeighbor };
