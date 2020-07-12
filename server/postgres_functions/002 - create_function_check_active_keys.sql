-- FUNCTION: public.insert_key_into_booking_keys(varchar)

-- DROP FUNCTION public.insert_key_into_booking_keys(varchar);

CREATE OR REPLACE FUNCTION public.check_active_keys(
	_key_code varchar)
    RETURNS varchar
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
	DECLARE
	_key_id integer;
   BEGIN
   _key_id := (select id from keys where code = _key_code limit 1);
    IF not exists (select 1 from keys where id = _key_id) THEN
    RETURN 'Inserted key does not exist';
    END IF;
    IF not exists (select 1 from booking_keys bk
				   inner join bookings b on b.id = bk.booking_id
				   where bk.key_id=_key_id
				   and NOW() between b.date_from and b.date_to
				  ) THEN
	RETURN 'ok';
	ELSE
	RETURN 'key already binded to another room';
	END IF;
   END;
   $BODY$;

ALTER FUNCTION public.check_active_keys(varchar)
    OWNER TO postgres;
