CREATE DATABASE force;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  nickname TEXT NOT NULL DEFAULT 'user-nickname',
  balance INT DEFAULT 100500,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO public.users(
	id, nickname, balance, created_at)
	VALUES (DEFAULT , DEFAULT , DEFAULT,  DEFAULT);