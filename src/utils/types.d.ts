interface Params {
  id?: string | undefined,
}
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

interface SpaceXEvent {
  links: {
    article: string;
  };
  title: string;
  event_date_utc: string;
  event_date_unix: number;
  details: string;
  id: string;
}

interface Headquarters {
  address: string;
  city: string;
  state: string;
}

interface Links {
  website: string;
  flickr: string;
  twitter: string;
  elon_twitter: string;
}

interface SpaceXInfo {
  headquarters: Headquarters;
  links: Links;
  name: string;
  founder: string;
  founded: number;
  employees: number;
  vehicles: number;
  launch_sites: number;
  test_sites: number;
  ceo: string;
  cto: string;
  coo: string;
  cto_propulsion: string;
  valuation: number;
  summary: string;
  id: string;
}

interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

interface PatchLinks {
  small: string;
  large: string;
}

interface RedditLinks {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

interface FlickrLinks {
  small: string[];
  original: string[];
}

interface Links {
  patch: PatchLinks;
  reddit: RedditLinks;
  flickr: FlickrLinks;
  presskit: string | null;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

interface Failure {
  time: number;
  altitude: number | null;
  reason: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

interface Launch {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: Failure[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

interface DragonInfo {
  capsule: null;
  mass_returned_kg: null;
  mass_returned_lbs: null;
  flight_time_sec: null;
  manifest: null;
  water_landing: null;
  land_landing: null;
}

interface Payload {
  name: string;
  type: string;
  reused: boolean;
  launch: string;
  customers: string[];
  norad_ids: number[];
  nationalities: string[];
  manufacturers: string[];
  mass_kg: number;
  mass_lbs: number;
  orbit: string;
  reference_system: string;
  regime: string;
  longitude: null;
  semi_major_axis_km: null;
  eccentricity: null;
  periapsis_km: number;
  apoapsis_km: number;
  inclination_deg: number;
  period_min: null;
  lifespan_years: null;
  epoch: null;
  mean_motion: null;
  raan: null;
  arg_of_pericenter: null;
  mean_anomaly: null;
  id: string;
}

interface LandingZone {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  status: string;
  type: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  landing_attempts: number;
  landing_successes: number;
  wikipedia: string;
  details: string;
  launches: string[];
  id: string;
}

interface LaunchPad {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
  id: string;
}
