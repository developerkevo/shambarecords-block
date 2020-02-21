import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Shambarecords } from './shambarecords.model';
import {Farmerreg} from './farmerreg.model';
import {  Coopreg } from './coopreg.model';
import * as yup from'yup';
import 'lodash';
import _ = require('lodash');

@Controller('shambarecords')
export class ShambarecordsController extends ConvectorController<ChaincodeTx> {
 /* @Invokable()
  public async create(
    @Param(Shambarecords)
    shambarecords: Shambarecords
  ) {
    await shambarecords.save();
  }*/
  @Invokable()
  public async createFarmer(
    @Param(Farmerreg)
    farmerreg: Farmerreg
  ) 
    {
      let exists = await Farmerreg.getOne(farmerreg.idnumber);
      if (!!exists && exists.idnumber) {
        throw new Error('There is a person registered with this Id ${farmerreg.id} already');
        
      }
      farmerreg.identity=this.sender;
    await farmerreg.save();
  }
  @Invokable()
  public async createCoop(
    @Param(Coopreg)
    coopreg: Coopreg
  ) {
    let exists = await Coopreg.getOne(coopreg.coopid);
    if (!!exists && exists.coopid) {
      throw new Error('There is a cooperative  registered with that Id already');
      
    }
    coopreg.identity=this.sender;
    await coopreg.save();
  }
  @Invokable()
  public async getAllFarmers() {
   
   return (await Farmerreg.getAll()).map(farmers=>farmers.toJSON() as Farmerreg);
    
  }
  @Invokable()
  public async getAllCoop() {
    return (await Coopreg.getAll()).map(cooperatives=>cooperatives.toJSON() as Coopreg);
   
  }
  @Invokable()
  public async getFarmerById(
   @Param(yup.string())
   idnumber: string
  ){
   const farmer=await Farmerreg.getOne(idnumber);
   const f=farmer.toJSON() as Farmerreg;
  
   const final=_.omit(f,['email','password','identity','phoneNumber','created']);
   return final.toJSON() ;
  }
  @Invokable()
  public async getCoopById(
   @Param(yup.number())
   coopid: string
  ){
   const coop=await Coopreg.getOne(coopid);

   return coop.toJSON() as Coopreg;
  }



}