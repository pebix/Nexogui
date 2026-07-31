-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2026 a las 22:41:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nexogui_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `token` varchar(64) NOT NULL,
  `expira_at` datetime NOT NULL,
  `creado_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `token_hash` varchar(64) NOT NULL,
  `expira_at` datetime NOT NULL,
  `creado_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL COMMENT 'Null si se registra exclusivamente con red social',
  `telefono` varchar(20) DEFAULT NULL,
  `auth_provider` enum('local','google','facebook') DEFAULT 'local',
  `provider_id` varchar(100) DEFAULT NULL COMMENT 'ID proveniente de Google o Facebook',
  `rol` enum('vecino','moderador','administrador') DEFAULT 'vecino',
  `estado` enum('activo','inactivo','bloqueado') DEFAULT 'activo',
  `terminos_aceptados` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password_hash`, `telefono`, `auth_provider`, `provider_id`, `rol`, `estado`, `terminos_aceptados`, `fecha_registro`, `fecha_actualizacion`) VALUES
(1, 'Kate', 'Bianchi', 'kate@gmail.com', '$2y$10$LfEYoRw8eXwVH/ixRDDnJ.Hw3rDaplUPn0k37QKrjM.HrE5NuJevC', '091491438', 'local', NULL, 'vecino', 'activo', 1, '2026-07-24 15:04:12', '2026-07-24 15:04:12'),
(2, 'ramiro', 'batista', 'ramiroba.9123@gmail.com', '$2y$10$vJ4PKgbfzxYRCX9nQN26Hufu8vNklqYx73o2gdzD.cuX/Im02giem', '091752831', 'local', NULL, 'vecino', 'activo', 1, '2026-07-24 16:05:04', '2026-07-24 16:05:04'),
(4, 'Sebastian', 'Espiga', 'ssebastiann@gmail.com', '$2y$10$gz291F15tNkFQ2HSG3Kd2eKz2u6mx7EdbGdn59OYIYHIUNDksfFAS', '', 'local', NULL, 'vecino', 'activo', 1, '2026-07-29 13:20:37', '2026-07-29 13:20:37'),
(5, 'hola', 'jola', 'ajjaja@gmaill.com', '$2y$10$gWRKxTzQPxcWohEIWj.sAu55b.7C9/k9mYhw3108kBOUQlRXXUypa', '', 'local', NULL, 'vecino', 'activo', 1, '2026-07-29 17:07:44', '2026-07-29 17:07:44');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_password_resets_token` (`token`);

--
-- Indices de la tabla `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_hash` (`token_hash`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_user_tokens_hash` (`token_hash`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_usuarios_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
