-- ==============================
-- SEED: COURSES
-- ==============================
INSERT OR IGNORE INTO courses (id, slug, title, description, published)
VALUES (
  'fundamentos-de-rust',
  'fundamentos-de-rust',
  'Fundamentos de Rust',
  'Aprende Rust desde los fundamentos: sintaxis, ownership, borrowing y más.',
  1
);

-- ==============================
-- SEED: COURSE SECTIONS (lessons)
-- ==============================
INSERT OR IGNORE INTO course_sections (id, course_id, slug, title, position) VALUES
  ('fundamentos-de-rust-introduccion-rust',        'fundamentos-de-rust', 'introduccion-rust',        'Introducción a Rust',        1),
  ('fundamentos-de-rust-sintaxis-esencial',        'fundamentos-de-rust', 'sintaxis-esencial',        'Sintaxis Esencial',          2),
  ('fundamentos-de-rust-variables-mutabilidad',    'fundamentos-de-rust', 'variables-mutabilidad',    'Variables y Mutabilidad',    3),
  ('fundamentos-de-rust-tipos-primitivos',         'fundamentos-de-rust', 'tipos-primitivos',         'Tipos Primitivos',           4),
  ('fundamentos-de-rust-constantes-shadowing',     'fundamentos-de-rust', 'constantes-shadowing',     'Constantes y Shadowing',     5),
  ('fundamentos-de-rust-ejercicio-sintaxis',       'fundamentos-de-rust', 'ejercicio-sintaxis',       'Ejercicio: Sintaxis',        6),
  ('fundamentos-de-rust-control-flujo',            'fundamentos-de-rust', 'control-flujo',            'Control de Flujo',           7),
  ('fundamentos-de-rust-if-expresion',             'fundamentos-de-rust', 'if-expresion',             'If como Expresión',          8),
  ('fundamentos-de-rust-match',                    'fundamentos-de-rust', 'match',                    'Match',                      9),
  ('fundamentos-de-rust-bucles',                   'fundamentos-de-rust', 'bucles',                   'Bucles',                     10),
  ('fundamentos-de-rust-ejercicio-control-flujo',  'fundamentos-de-rust', 'ejercicio-control-flujo',  'Ejercicio: Control de Flujo',11),
  ('fundamentos-de-rust-funciones',                'fundamentos-de-rust', 'funciones',                'Funciones',                  12),
  ('fundamentos-de-rust-ejercicio-funciones',      'fundamentos-de-rust', 'ejercicio-funciones',      'Ejercicio: Funciones',       13),
  ('fundamentos-de-rust-ownership',                'fundamentos-de-rust', 'ownership',                'Ownership',                  14),
  ('fundamentos-de-rust-ejercicio-ownership',      'fundamentos-de-rust', 'ejercicio-ownership',      'Ejercicio: Ownership',       15),
  ('fundamentos-de-rust-borrowing',                'fundamentos-de-rust', 'borrowing',                'Borrowing',                  16),
  ('fundamentos-de-rust-referencias-inmutables',   'fundamentos-de-rust', 'referencias-inmutables',   'Referencias Inmutables',     17),
  ('fundamentos-de-rust-referencias-mutables',     'fundamentos-de-rust', 'referencias-mutables',     'Referencias Mutables',       18),
  ('fundamentos-de-rust-ejercicio-borrowing',      'fundamentos-de-rust', 'ejercicio-borrowing',      'Ejercicio: Borrowing',       19),
  ('fundamentos-de-rust-slices',                   'fundamentos-de-rust', 'slices',                   'Slices',                     20),
  ('fundamentos-de-rust-ejercicio-slices',         'fundamentos-de-rust', 'ejercicio-slices',         'Ejercicio: Slices',          21),
  ('fundamentos-de-rust-structs',                  'fundamentos-de-rust', 'structs',                  'Structs',                    22),
  ('fundamentos-de-rust-definicion-structs',       'fundamentos-de-rust', 'definicion-structs',       'Definición de Structs',      23),
  ('fundamentos-de-rust-metodos-impl',             'fundamentos-de-rust', 'metodos-impl',             'Métodos e Impl',             24),
  ('fundamentos-de-rust-ejercicio-structs',        'fundamentos-de-rust', 'ejercicio-structs',        'Ejercicio: Structs',         25),
  ('fundamentos-de-rust-enums',                    'fundamentos-de-rust', 'enums',                    'Enums',                      26),
  ('fundamentos-de-rust-enums-con-datos',          'fundamentos-de-rust', 'enums-con-datos',          'Enums con Datos',            27),
  ('fundamentos-de-rust-option-result',            'fundamentos-de-rust', 'option-result',            'Option y Result',            28),
  ('fundamentos-de-rust-ejercicio-enums',          'fundamentos-de-rust', 'ejercicio-enums',          'Ejercicio: Enums',           29),
  ('fundamentos-de-rust-manejo-errores',           'fundamentos-de-rust', 'manejo-errores',           'Manejo de Errores',          30),
  ('fundamentos-de-rust-result-y-propagacion',     'fundamentos-de-rust', 'result-y-propagacion',     'Result y Propagación',       31),
  ('fundamentos-de-rust-ejercicio-errores',        'fundamentos-de-rust', 'ejercicio-errores',        'Ejercicio: Errores',         32),
  ('fundamentos-de-rust-colecciones',              'fundamentos-de-rust', 'colecciones',              'Colecciones',                33),
  ('fundamentos-de-rust-vec',                      'fundamentos-de-rust', 'vec',                      'Vec',                        34),
  ('fundamentos-de-rust-hashmap',                  'fundamentos-de-rust', 'hashmap',                  'HashMap',                    35),
  ('fundamentos-de-rust-iteradores',               'fundamentos-de-rust', 'iteradores',               'Iteradores',                 36),
  ('fundamentos-de-rust-ejercicio-colecciones',    'fundamentos-de-rust', 'ejercicio-colecciones',    'Ejercicio: Colecciones',     37),
  ('fundamentos-de-rust-modulos',                  'fundamentos-de-rust', 'modulos',                  'Módulos',                    38),
  ('fundamentos-de-rust-ejercicio-modulos',        'fundamentos-de-rust', 'ejercicio-modulos',        'Ejercicio: Módulos',         39);
