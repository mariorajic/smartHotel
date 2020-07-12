-- FUNCTION: public.get_all_rooms(integer)

-- DROP FUNCTION public.get_all_rooms(integer);

CREATE OR REPLACE FUNCTION public.get_all_rooms(
	_floor_id integer)
    RETURNS TABLE (
	id integer,
	number integer,
	name varchar,
	capacity integer,
	is_deleted boolean,
	door_status boolean,
    sos_status boolean,
	window_status boolean,
	key_status boolean,
	floor_id integer,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
	occupied_from timestamp with time zone,
	occupied_to timestamp with time zone,
	firstname varchar,
	lastname varchar)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE
AS $BODY$
   BEGIN
   set time zone 'Europe/Rome';
   return query select r.id, r.number, r.name, r.capacity, r.is_deleted, r.door_status, r.sos_status,
   r.window_status, r.key_status, r.floor_id, r.created_at, r.updated_at, (select b.date_from from bookings b
				where NOW()::date between b.date_from and b.date_to
                and b.room_id = r.id limit 1) as occupied_from,
                (select b.date_to from bookings b
                where NOW()::date between b.date_from and b.date_to
                and b.room_id = r.id limit 1) as occupied_to,
                (select b.firstname from bookings b
                where NOW()::date between b.date_from and b.date_to
                and b.room_id = r.id limit 1) as firstname,
                (select b.lastname from bookings b
                where NOW()::date between b.date_from and b.date_to
                and b.room_id = r.id limit 1) as lastname
                from rooms r
                inner join floors f on f.id = r.floor_id where r.floor_id = _floor_id and r.is_deleted = false  order by r.number asc;
	END;
   $BODY$;

ALTER FUNCTION public.get_all_rooms(integer)
    OWNER TO postgres;
