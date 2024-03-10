import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Point, getTheBestRouter } from '@/store/routersSlice';
import { Place as PlaceIcon, DirectionsCar as DirectionsCarIcon } from '@mui/icons-material';
// Função para desenhar os clients e rotas no canvas
function drawCanvas(ctx: CanvasRenderingContext2D, driversRoutes: Point[][]) {
    const driverColors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF']; // Cores para cada motorista
    ctx.lineWidth = 4;

    driversRoutes.forEach((route, i) => {
        const startPoint = route[0]; // Ponto inicial do motorista
        const driverColor = driverColors[i % driverColors.length];

        // Desenha as linhas representando as rotas de cada motorista
        ctx.strokeStyle = driverColor;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);

        route.forEach((point, j) => {
            if (j !== 0) {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = driverColor;
                ctx.fill();
                ctx.font = "18px serif";
                ctx.fillText(`📍 Parada ${j}: ${point.name}`, point.x + 5, point.y - 5);
            }
        });
    });
}

export default function Router(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showClients, setShowClients] = useState<boolean>(false);
    const [pointsByRoute, setPointsByRoute] = useState<number>(3);
    const [numDrivers, setNumDrivers] = useState<number>(3);
    const [driversRoutes, setDriversRoutes] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const optimizedRoutes = useSelector((state: RootState) => state.routers.optimizedRoutes);
    const clients = useSelector((state: RootState) => state.clients.clients);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (showClients) {
            drawCanvas(ctx, optimizedRoutes);
        }
    }, [showClients, optimizedRoutes]);

    const handleShowClients = async () => {
        const routes = await dispatch(getTheBestRouter({
            startPoint: { x: 0, y: 0, name: 'Empresa' },
            clientsData: clients.map((client: any) => ({
                name: client.name,
                email: client.email,
                telefone: client.telefone,
                x: Number(client.coord_x),
                y: Number(client.coord_y)
            })),
            pointsByRoute: pointsByRoute,
            numDrivers: numDrivers
        }));
        setShowClients(true);
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
                <h1>Gerenciador de itinerários</h1>
            </Grid>
            <Grid item>
                <DirectionsCarIcon />
                <Select
                    value={numDrivers}
                    onChange={(event) => setNumDrivers(event.target.value as number)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </Grid>
            <Grid item>
                <PlaceIcon />

                <Select
                    value={pointsByRoute}
                    onChange={(event) => setPointsByRoute(event.target.value as number)}
                >

                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </Grid>

            <Grid item>
                <Button variant="contained" onClick={handleShowClients}>
                    Gerar Rotas
                </Button>
            </Grid>
            <Grid item>
                <canvas ref={canvasRef} width={800} height={600}></canvas>
            </Grid>
        </Grid>
    );
}
