import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Farmerreg extends ConvectorModel<Farmerreg> {

public static async getFromFingerprint(fingerprint:string) {
const farmers=await Farmerreg.query(Farmerreg,{
  selector:{
    type:new Farmerreg().type,
    identity:fingerprint
  }
}) as Farmerreg[];

if (!farmers.length) {
  throw new Error('No Farmer was found with fingerprint:${fingerprint}');
  
  
}

return farmers[0];



}
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.farmerreg';
 

  @Required()
  @Validate(yup.string())
  public firstname: string;
  @Required()
  @Validate(yup.string())
  public lastname: string;
  @Required()
  @Validate(yup.string())
  public idnumber: string;
  @Required()
  @Validate(yup.number())
  public dependants: number;
  @Required()
  @Validate(yup.string())
  public county: string;
  @Required()
  @Validate(yup.string())
  public country: string;
  @Required()
  @Validate(yup.number())
  public landacreage: number;
  @Required()
  @Validate(yup.string())
  public email: string;
  @Required()
  @Validate(yup.string())
  public password: string;
  @Required()
  @Validate(yup.string())
  public identity: string;

  @Required()
  @Validate(yup.string())
  public maincrop: string;
  @Required()
  @Validate(yup.string())
  public othercrop: string;
  @Required()
  @Validate(yup.string())
  public gender: string;
  @Required()
  @Validate(yup.number())
  public phoneNumber: number;
  @Required()
  @Validate(yup.number())
  public coopmembId: number;

  
  @Required()
  @ReadOnly()
  @Default(() => Date.now())
  public created: Date;


}
