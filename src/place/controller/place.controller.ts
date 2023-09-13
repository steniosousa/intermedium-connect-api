import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPlaceDto } from 'place/dto/createPlace.dto';
import { findPlacesDto } from 'place/dto/findPlaces.dto';
import { PlaceService } from 'place/service/place.service';

@Controller('/place')
export class PlaceController {
  constructor(private readonly service: PlaceService) {}
  @Post('')
  async createPlace(@Body() body: createPlaceDto) {
    const save = await this.service.createPlace(body);
    return save;
  }

  @Get('')
  async findPlaces(@Body() body: findPlacesDto) {
    const findPlaces = await this.service.findPlaces(body);
    return findPlaces;
  }
}
