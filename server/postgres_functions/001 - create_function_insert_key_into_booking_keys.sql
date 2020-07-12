-- FUNCTION: public.insert_key_into_booking_keys(varchar, integer)

-- DROP FUNCTION public.insert_key_into_booking_keys(varchar integer);

CREATE OR REPLACE FUNCTION public.insert_key_into_booking_keys(
	_key_code varchar,
	_booking_id integer)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
	DECLARE
	_key_id integer;
   BEGIN
   _key_id := (select id from keys where code = _key_code limit 1);
    IF not exists (select 1 from booking_keys bk
				   inner join bookings b on b.id = bk.booking_id
				   where bk.key_id=_key_id
				   and NOW() between b.date_from and b.date_to
				  ) THEN
	insert into booking_keys (booking_id, key_id, created_at, updated_at)
	VALUES (_booking_id, _key_id, NOW(), NOW());
	RETURN true;
	ELSE
	RETURN false;
	END IF;
   END;
   $BODY$;

ALTER FUNCTION public.insert_key_into_booking_keys(varchar, integer)
    OWNER TO postgres;
