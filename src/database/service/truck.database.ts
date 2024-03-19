import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class TruckDatabase {
    constructor(private readonly prisma: PrismaService) { }

    async startMonitoring(plate: string, lat: number, lng: number) {
        try {
            const truck = await this.prisma.truck.findUnique({
                where: { plate },
            });

            if (truck) {
                const coords = await this.prisma.coords.create({
                    data: {
                        lat,
                        lng,
                    },
                });

                const cords = await this.prisma.coordsForTruck.create({
                    data: {
                        truckId: truck.id,
                        coordsId: coords.id,
                    },
                });
                return cords
                console.log('Nova coordenada associada ao caminhão existente.');
            } else {
                throw new Error('Caminhão não encontrado.');
            }
        } catch (error) {
            throw new Error('Erro ao começar monitoramento');
        }
    }

    async recover() {
        try {
            const trucks = await this.prisma.truck.findMany();
            return trucks
        } catch {
            throw new Error('Erro ao recuperar caminhões');
        }
    }


    async recoverCoords(plate: string) {
        try {
            const trucks = await this.prisma.coordsForTruck.findFirstOrThrow({
                where: {
                    truck: {
                        plate
                    }
                },
                select: {
                    coords: {
                        select: {
                            lat: true,
                            lng: true,
                            time: true
                        }
                    }
                },
                orderBy: {
                    coords: {
                        time: 'desc'
                    }
                }
            });
            return trucks
        } catch (error){
        console.log(error,plate)

            throw new Error('Erro ao recuperar caminhões');
        }
    }
}