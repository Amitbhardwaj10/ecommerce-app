-- Category Table Data

insert into category (category) values ('men''s clothing');
INSERT INTO category (category) VALUES ('electronics');
INSERT INTO category (category) VALUES ('jewelery');
INSERT INTO category (category) VALUES ('women''s clothing');

-- ***********************************************************


-- Product Table Data

insert into products (title, description, price, image, category_id)
values (
  'Fjallraven - Foldsack No. 1 Backpack',
  'Perfect pack for everyday use and forest walks.',
  109.95,
  'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  1
);

insert into products (title, description, price, image, category_id)
values (
    'Mens Casual Premium Slim Fit T-Shirts',
    'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    22.3,
    'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
     1
);

insert into products (title, description, price, image, category_id)
values (
    'Mens Cotton Jacket',
    'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    55.95,
    'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
     1
);

insert into products (title, description, price, image, category_id)
values (
    'Mens Casual Slim Fit',
    'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    15.99,
    'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    1
);

insert into products (title, description, price, image, category_id)
values (
    'Solid Gold Petite Micropave',
    'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
    168.00,
    'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    3);

-- ***********************************************************************************************************************
