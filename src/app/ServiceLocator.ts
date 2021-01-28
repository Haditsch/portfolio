export class ServiceLocator { 
    static registeredClasses : any[] = new Array(); 
    public static register( 
      interfaceName: string, instance: any)  
    { 
      this.registeredClasses[interfaceName] = instance; 
    } 
    public static resolve( 
      interfaceName: string)  
    { 
      return this.registeredClasses[interfaceName]; 
    } 
  } 