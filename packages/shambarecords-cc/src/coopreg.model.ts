import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Coopreg extends ConvectorModel<Coopreg> {
  public static async getFromFingerprint(fingerprint:string) {
    const cooperatives=await Coopreg.query(Coopreg,{
      selector:{
        type:new Coopreg().type,
        identity:fingerprint
      }
    }) as Coopreg[];
    
    if (!cooperatives.length) {
      throw new Error('No Cooperative was found with fingerprint:${fingerprint}');
      
      
    }
    
    return cooperatives[0];
    
    
    
    }



  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.coopreg';

  @Required()
  @Validate(yup.string())
  public coopname: string;

  @Required()
  @Validate(yup.number())
  public coopid: string;
  
  @Required()
  @Validate(yup.string())
  public cooploc: string;
  @Required()
  @Validate(yup.string())
  public identity: string;
  @Required()
  @ReadOnly()
  @Default(() => Date.now())
  public created: Date;
 
}
