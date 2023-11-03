CREATE TABLE IF NOT EXISTS users
(
    id       varchar(255) not null,
    password varchar(255),
    username varchar(255),
    primary key (id),
    CONSTRAINT UNIQUE_USERNAME unique (username)
 );

CREATE TABLE IF NOT EXISTS contact_point_entity
(
    dm_contact_point_type varchar(31)  not null,
    id                    varchar(255) not null,
    contact_point_type    varchar(255),
    phone_nr              varchar(255),
    user_id               varchar(255),
    primary key (id),
    CONSTRAINT FK_CONTACT_POINT_ENTITY_USERS FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS user_entity_roles
(
    user_entity_id varchar(255) not null,
    roles          varchar(255),
    CONSTRAINT FK_USER_ENTITY_ROLES_USERS FOREIGN KEY (user_entity_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS dwarfparticipant
(
    id              varchar(255) not null,
    to_dwarf_name   varchar(255),
    name            varchar(255) not null,
    user_id         varchar(255) not null,
    primary key (id)
);