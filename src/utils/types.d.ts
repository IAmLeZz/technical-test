interface Height {
    meters: number;
    feet: number;
  }
  
  interface Diameter {
    meters: number;
    feet: number;
  }
  
  interface Mass {
    kg: number;
    lb: number;
  }
  
  interface Thrust {
    kN: number;
    lbf: number;
  }
  
  interface FirstStage {
    thrust_sea_level: Thrust;
    thrust_vacuum: Thrust;
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number;
  }
  
  interface CompositeFairing {
    height: Height;
    diameter: Diameter;
  }
  
  interface Payloads {
    composite_fairing: CompositeFairing;
    option_1: string;
  }
  
  interface SecondStage {
    thrust: Thrust;
    payloads: Payloads;
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number;
  }
  
  interface Isp {
    sea_level: number;
    vacuum: number;
  }
  
  interface Engines {
    isp: Isp;
    thrust_sea_level: Thrust;
    thrust_vacuum: Thrust;
    number: number;
    type: string;
    version: string;
    layout: string;
    engine_loss_max: number;
    propellant_1: string;
    propellant_2: string;
    thrust_to_weight: number;
  }
  
  interface PayloadWeight {
    id: string;
    name: string;
    kg: number;
    lb: number;
  }
  
  interface Rocket {
    height: Height;
    diameter: Diameter;
    mass: Mass;
    first_stage: FirstStage;
    second_stage: SecondStage;
    engines: Engines;
    landing_legs: {
      number: number;
      material: string | null;
    };
    payload_weights: PayloadWeight[];
    flickr_images: string[];
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    wikipedia: string;
    description: string;
    id: string;
  }