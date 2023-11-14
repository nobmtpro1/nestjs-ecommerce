-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql
-- Thời gian đã tạo: Th10 14, 2023 lúc 04:44 AM
-- Phiên bản máy phục vụ: 5.7.44
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nestjs_ecommerce`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image`
--

CREATE TABLE `image` (
  `id` varchar(36) NOT NULL,
  `src` longtext NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1699933359551, 'Migration1699933359551'),
(2, 1699933498822, 'Migration1699933498822'),
(3, 1699935197477, 'Migration1699935197477');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_description` varchar(1000) NOT NULL,
  `description` longtext NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'VARIABLE',
  `status` int(11) NOT NULL DEFAULT '1',
  `slug` varchar(1000) NOT NULL,
  `image_id` varchar(36) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_category`
--

CREATE TABLE `product_category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(1000) NOT NULL,
  `description` longtext NOT NULL,
  `image_id` varchar(36) DEFAULT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_m2m_image`
--

CREATE TABLE `product_m2m_image` (
  `productId` varchar(36) NOT NULL,
  `imageId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_m2m_product_category`
--

CREATE TABLE `product_m2m_product_category` (
  `productId` varchar(36) NOT NULL,
  `productCategoryId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_m2m_product_tag`
--

CREATE TABLE `product_m2m_product_tag` (
  `productId` varchar(36) NOT NULL,
  `productTagId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_option`
--

CREATE TABLE `product_option` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `values` text NOT NULL,
  `product_id` varchar(36) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_tag`
--

CREATE TABLE `product_tag` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variant`
--

CREATE TABLE `product_variant` (
  `id` varchar(36) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `downloadable` tinyint(4) NOT NULL DEFAULT '0',
  `is_virtual` tinyint(4) NOT NULL DEFAULT '0',
  `is_manage_stock` tinyint(4) NOT NULL DEFAULT '0',
  `regular_price` bigint(20) NOT NULL DEFAULT '0',
  `sale_price` bigint(20) NOT NULL DEFAULT '0',
  `sale_price_from` date DEFAULT NULL,
  `sale_price_to` date DEFAULT NULL,
  `sold_individually` tinyint(4) NOT NULL DEFAULT '0',
  `stock` int(11) DEFAULT NULL,
  `stock_status` int(11) NOT NULL DEFAULT '1',
  `weight` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `imageId` varchar(255) DEFAULT NULL,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `product_id` varchar(36) DEFAULT NULL,
  `image_id` varchar(36) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` text NOT NULL,
  `permissions` text NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `roles`, `permissions`, `created_at`, `updated_at`) VALUES
('3eee8b0e-648f-4841-8a0d-facc72389406', 'admin', 'admin@gmail.com', '$2b$10$Pluv4R7koMUMTgXfqnTiAubV8mF9Zou1IiW4shZ0LUNGf6.1mAQDS', 'ADMIN,USER', '', '2023-11-14 04:42:54.399729', '2023-11-14 04:42:54.399729');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8cfaf4a1e80806d58e3dbe6922` (`slug`),
  ADD UNIQUE KEY `REL_99d98a80f57857d51b5f63c824` (`image_id`);

--
-- Chỉ mục cho bảng `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_d7cf9c55e1fc04c672ce0f524b` (`slug`),
  ADD UNIQUE KEY `REL_5b2718e9fc40766e31de1d5387` (`image_id`),
  ADD KEY `FK_569b30aa4b0a1ad42bcd30916aa` (`parentId`);

--
-- Chỉ mục cho bảng `product_m2m_image`
--
ALTER TABLE `product_m2m_image`
  ADD PRIMARY KEY (`productId`,`imageId`),
  ADD KEY `IDX_fa6b2b3cb16ac92ef7a09aef0b` (`productId`),
  ADD KEY `IDX_d1d6456ee2bf73f4f90d60422f` (`imageId`);

--
-- Chỉ mục cho bảng `product_m2m_product_category`
--
ALTER TABLE `product_m2m_product_category`
  ADD PRIMARY KEY (`productId`,`productCategoryId`),
  ADD KEY `IDX_6c1a7d4f25e3dd540c8fc0181b` (`productId`),
  ADD KEY `IDX_2be1094a40714e6764b9a9535e` (`productCategoryId`);

--
-- Chỉ mục cho bảng `product_m2m_product_tag`
--
ALTER TABLE `product_m2m_product_tag`
  ADD PRIMARY KEY (`productId`,`productTagId`),
  ADD KEY `IDX_5c50cb9901347050fe7e7e4922` (`productId`),
  ADD KEY `IDX_ef8060ecdd52b3cc9cda336825` (`productTagId`);

--
-- Chỉ mục cho bảng `product_option`
--
ALTER TABLE `product_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e634fca34f6b594b87fdbee95f6` (`product_id`);

--
-- Chỉ mục cho bảng `product_tag`
--
ALTER TABLE `product_tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_df61892edc20a1f3cc889c4754` (`name`);

--
-- Chỉ mục cho bảng `product_variant`
--
ALTER TABLE `product_variant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_e768b1a1fe30fe0aa9cc54b1a8` (`image_id`),
  ADD KEY `FK_ca67dd080aac5ecf99609960cd2` (`product_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_99d98a80f57857d51b5f63c8240` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `FK_569b30aa4b0a1ad42bcd30916aa` FOREIGN KEY (`parentId`) REFERENCES `product_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5b2718e9fc40766e31de1d53870` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_m2m_image`
--
ALTER TABLE `product_m2m_image`
  ADD CONSTRAINT `FK_d1d6456ee2bf73f4f90d60422f1` FOREIGN KEY (`imageId`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_fa6b2b3cb16ac92ef7a09aef0bd` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_m2m_product_category`
--
ALTER TABLE `product_m2m_product_category`
  ADD CONSTRAINT `FK_2be1094a40714e6764b9a9535e5` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6c1a7d4f25e3dd540c8fc0181b4` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_m2m_product_tag`
--
ALTER TABLE `product_m2m_product_tag`
  ADD CONSTRAINT `FK_5c50cb9901347050fe7e7e4922b` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ef8060ecdd52b3cc9cda3368251` FOREIGN KEY (`productTagId`) REFERENCES `product_tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_option`
--
ALTER TABLE `product_option`
  ADD CONSTRAINT `FK_e634fca34f6b594b87fdbee95f6` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_variant`
--
ALTER TABLE `product_variant`
  ADD CONSTRAINT `FK_ca67dd080aac5ecf99609960cd2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e768b1a1fe30fe0aa9cc54b1a83` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
