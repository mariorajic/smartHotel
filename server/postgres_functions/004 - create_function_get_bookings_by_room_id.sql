CREATE OR REPLACE FUNCTION public.get_bookings_by_room_id(
	_room_id integer)
    RETURNS TABLE (
	id integer,
	firstname varchar,
	lastname varchar,
	date_from timestamp with time zone,
	date_to timestamp with time zone,
	is_deleted boolean,
	room_id integer,
	created_at timestamp with time zone,
	updated_at timestamp with time zone)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$
   BEGIN
   set time zone 'Europe/Rome';
   return query select b.id, b.firstname, b.lastname, b.date_from, b.date_to, b.is_deleted, b.room_id,b.created_at,b.updated_at
                from bookings b where b.room_id = _room_id;
	END;
   $BODY$;

ALTER FUNCTION public.get_bookings_by_room_id(integer)
    OWNER TO postgres;
