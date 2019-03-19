CREATE TABLE IF NOT EXISTS users (
  id                serial PRIMARY KEY,
  firstname         varchar(40),
  lastname          varchar(40),
  email             varchar(100) UNIQUE,
  user_password     varchar(30),
  birthday          DATE,
  phone             varchar(12)
);

CREATE TABLE IF NOT EXISTS user_vehicles (
  id                serial PRIMARY KEY,
  user_id           INTEGER,
  car_make          varchar(30),
  car_model         varchar(30),
  license_plate     varchar(10),
  year              INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS user_payment (
  id                serial PRIMARY KEY,
  user_id           INTEGER,
  credit_card       varchar(20),
  billing_address   TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS owners (
  id                serial PRIMARY KEY,
  firstname         varchar(40),
  lastname          varchar(40),
  email             varchar(100) UNIQUE,
  owner_password    varchar(30),
  account_number    TEXT,
  routing_number    TEXT,
  bank              varchar(30)
);

CREATE TABLE IF NOT EXISTS spaces (
  id                serial PRIMARY KEY,
  owner_id           INTEGER,
  parking_address   TEXT,
  directions        TEXT,
  weekday_rate      REAL,
  weekend_rate      REAL,
  monday            varchar(100),
  tuesday           varchar(100),
  wednesday         varchar(100),
  thursday          varchar(100),
  friday            varchar(100),
  saturday          varchar(100),
  sunday            varchar(100),
  FOREIGN KEY (owner_id) REFERENCES owners (id)
);

CREATE TABLE IF NOT EXISTS reservations (
  id                serial PRIMARY KEY,
  user_id           INTEGER,
  space_id          INTEGER,
  start_res         varchar(20),
  end_res           varchar(20),
  actual_start      varchar(20),
  actual_end        varchar(20),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (space_id) REFERENCES spaces (id)
);