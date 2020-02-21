import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';

export class Shambarecords extends ConvectorModel<Shambarecords> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.shambarecords';

  
  
}
