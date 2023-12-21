import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { createPlaceDto } from 'place/dto/createPlace.dto';
import { findPlacesDto } from 'place/dto/findPlaces.dto';
import { PlaceService } from 'place/service/place.service';

@Controller('/place')
export class PlaceController {
  constructor(private readonly service: PlaceService) { }

  @Post('/create')
  async createPlace(@Body() body: createPlaceDto) {
    const save = await this.service.createPlace(body);
    return save;
  }

  @Get('/recover')
  async findPlaces(@Query() query: findPlacesDto) {
    const { companyId } = query
    const findPlaces = await this.service.findPlaces(companyId);
    return findPlaces;
  }

  @Post('/update')
  async update(@Body() { id, name }) {
    const update = await this.service.updatePlace(id, name)
    return update
  }

  @Delete('/delete')
  async delete(@Query() { placeId }) {
    try {
      const deletePlace = await this.service.deletePlace(placeId)
      return deletePlace

    } catch (error) {
      let message = 'Error'
      if (error instanceof Error) {
        message = error.message
      }
      throw new Error(message)
    }
  }

}
