PGDMP      8                |         	   next_auth    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    49152 	   next_auth    DATABASE     |   CREATE DATABASE next_auth WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE next_auth;
                postgres    false            �            1259    49163 	   customers    TABLE     �  CREATE TABLE public.customers (
    id integer NOT NULL,
    given_name character varying(255),
    family_name character varying(255),
    email character varying(255),
    phone_number character varying(255),
    address_line_1 character varying(255),
    address_line_2 character varying(255),
    city character varying(255),
    state character varying(255),
    zip_code character varying(255),
    country character varying(255),
    bio text,
    status character varying(255),
    password character varying(255),
    verification_code character varying(255),
    verification_expire_date timestamp without time zone,
    google_id character varying(255),
    picture character varying(255),
    verified_with character varying(255)
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    49162    customers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.customers_id_seq;
       public          postgres    false    218            �           0    0    customers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;
          public          postgres    false    217            �            1259    49153    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    49158    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216                        2604    49166    customers id    DEFAULT     l   ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
 ;   ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218                       2604    49159    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �          0    49163 	   customers 
   TABLE DATA           �   COPY public.customers (id, given_name, family_name, email, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, status, password, verification_code, verification_expire_date, google_id, picture, verified_with) FROM stdin;
    public          postgres    false    218   �       �          0    49153    users 
   TABLE DATA           4   COPY public.users (id, email, password) FROM stdin;
    public          postgres    false    215   �       �           0    0    customers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.customers_id_seq', 1, true);
          public          postgres    false    217            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    216            $           2606    49170    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    218            "           2606    49161    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �   �   x�5��
�0 @����ts�tA��	���Zk�Y ѿ�A��p�N ��5������	�de:ٴ���C��� �($�*0�<$!!��pw�ښ��Z���e�A��4Bŉ��ڜ��d�Xo_�~̏�γY���8��HtЅ�5����sO�w�[~`�C�Ʊ3�      �   3   x�3�,-N-2tH�H�-�I�K���,H,..�/J1�2�a�5����� ��     