-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Des 2019 pada 17.10
-- Versi server: 10.4.10-MariaDB
-- Versi PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hiringchannels`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `chat`
--

CREATE TABLE `chat` (
  `id` varchar(79) NOT NULL,
  `sender` varchar(79) NOT NULL,
  `receiver` varchar(79) NOT NULL,
  `message` varchar(500) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `chat`
--

INSERT INTO `chat` (`id`, `sender`, `receiver`, `message`, `date_created`) VALUES
('bf449b50-7c63-56b8-b6f9-76fdb70995e8', 'undefined', 'undefined', 'undefined', '2019-12-11 23:20:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `persons`
--

INSERT INTO `persons` (`id`, `first_name`, `last_name`) VALUES
(1, 'iip', 'sh');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_companies`
--

CREATE TABLE `tb_companies` (
  `id` varchar(70) NOT NULL,
  `name` varchar(79) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `location` varchar(500) NOT NULL,
  `description` varchar(550) NOT NULL,
  `phonenumber` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(79) NOT NULL,
  `privilegelevels` varchar(20) DEFAULT 'company'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tb_companies`
--

INSERT INTO `tb_companies` (`id`, `name`, `logo`, `location`, `description`, `phonenumber`, `email`, `password`, `privilegelevels`) VALUES
('0f8fe972-5ce9-594c-b6c6-bb3430d03164', 'PT DJARUM FOUNDATION', 'djarum.png', 'kudus', 'tobaco', '087776889555', 'djarum@gmail.com', '34567', 'company'),
('13f37b36-4416-5576-8f52-86310f67791a', 'PT KAI', 'kai.jpg', 'Madiun', 'Transport', '087776889999', 'kai@gmail.com', '789', 'company'),
('99ad5554-84ba-5394-ad9e-42f37f7f0aa5', 'PT Lion Air', 'burung.jpg', 'Jakarta', 'Air Plane', '087776889333', 'lionair@gmail.com', '123', 'company'),
('c0f9a27b-779e-520a-9e8c-701a39dcd91a', 'PT Pasific Prestress Indonesia', 'prestress.jpg', 'bandung', 'Pabrik Semen', '08190355766', 'ppi@gmail.com', '54321', 'company'),
('eab740c4-2f60-5b91-bd75-a29ce0c7f9d5', 'PT 1001malam.com', '28926_cf2afd58887bb3d88f9ea634c62656955ab1b9ec_1001malam-com_l.jpeg', 'Jsurabaya', 'Hotel Reservation', '087776889777', '1001malam@gmail.com', '445', 'company');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_engineers`
--

CREATE TABLE `tb_engineers` (
  `id` varchar(74) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(400) NOT NULL,
  `skill` varchar(30) NOT NULL,
  `location` varchar(500) NOT NULL,
  `dateofbrith` varchar(12) NOT NULL,
  `phonenumber` varchar(50) NOT NULL DEFAULT '081905678123',
  `showcase` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL DEFAULT '12345',
  `privilegelevels` varchar(20) DEFAULT 'engineer',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tb_engineers`
--

INSERT INTO `tb_engineers` (`id`, `name`, `description`, `skill`, `location`, `dateofbrith`, `phonenumber`, `showcase`, `email`, `password`, `privilegelevels`, `date_created`, `date_updated`) VALUES
('13f8cde8-910c-50c4-829c-d1cc6bc22b6c', 'Mathea Ayu Vanda', 'bypass', 'Software Developer', 'Bypass', '01/01/1992', '081111234567', 'MatheaAyuVanda.jpg', 'ayu111@gmail.com', '12345', 'engineer', '2019-12-15 09:35:54', '2019-12-15 09:37:32'),
('66ef801e-7c69-5854-b167-dedd52b6b9ac', 'Eka Yuliyanti', 'bypass', 'Graphic & Web Designer', 'Bypass', '01/01/1992', '08111123666', 'EkaYuliyanti.jpg', 'eka111@gmail.com', '12345', 'engineer', '2019-12-15 09:52:43', '0000-00-00 00:00:00'),
('69434134-d41c-5f9f-84fa-f7d8b9e66ed4', 'Carline Darjanto', 'Wanita muda ini telah sukses membangun kerajaan bisnis di bidang fashion dengan brand Cotton Ink. Mengawali bisnis pembuatan kaos di tahun 2008 bersama sahabatnya, Ria Sarwono, merek Cotton Ink sukses mendapatkan sambutan pasar, serta memperoleh berbagai penghargaan, seperti Best Local Brand dari Free Magazine, Most Favorite Brand di Brightspot Market; The Most Innovative Brand dalam Cleo Fashion ', 'CEO & Creative Director at COT', 'jakarta', '25/05/1987', '0817192792', 'CarlineDarjanto.jpg', 'carline.darjanto@cottonink.co.id', '12345', 'engineer', '2019-12-15 06:58:55', '2019-12-15 09:13:42'),
('6fdbeeda-66e2-5801-9fe3-0b1995ca9b73', 'Kathleen Irena', 'bypass', 'Graphic & Web Designer', 'Bypass', '01/01/1990', '0811113958', 'KathleenIrena.jpg', 'rena111@gmail.com', '12345', 'engineer', '2019-12-15 09:55:15', '0000-00-00 00:00:00'),
('7131ffd7-b702-51d8-b6d0-a91af1b9e87f', 'Claudia Kusnadi', 'Bypass', 'undefined', 'Bypass', '01/01/1987', '0811116755', 'ClaudiaKusnadi.jpg', 'claudia111@gmail.com', '12345', 'engineer', '2019-12-15 10:00:17', '0000-00-00 00:00:00'),
('71ecf8f5-4773-56a0-829c-dba84670fefc', 'Ghea Safferina', 'Never tired of learning something new, Ghea decided to be a half university student and the other half employee (…and she also entrepreneur). When she was 17, after graduated from Telkom School majoring Programming she decide to take full time job on Batavianet IT Solution and Digital Agency, her daily job desk is not far away with graphic design, web design,  creative idea, marketing communicatio', 'undefined', 'Bypass', '01/01/1995', '0811119923', 'gheaSafferina.jpg', 'ghea111@gmail.com', '12345', 'engineer', '2019-12-15 09:58:39', '0000-00-00 00:00:00'),
('7a2abba3-584d-5057-aaa4-274609f5ea5e', 'M. Bambang Sumantri', 'Software Developer', 'undefined', 'Bypass', '01/01/1999', '0811116755', 'mbambang.jpg', 'mbambang111@gmail.com', '12345', 'engineer', '2019-12-15 10:02:40', '0000-00-00 00:00:00'),
('87a30c31-033b-54cd-a8ee-1229f2d5b0e5', 'Putri Rimi Cahyani', 'bypass', 'Web Developer', 'Bypass', '01/01/1997', '08111123778', 'PutriRimiCahyani.jpg', 'putri111@gmail.com', '12345', 'engineer', '2019-12-15 09:51:00', '0000-00-00 00:00:00'),
('a7ee748c-72b8-5817-b48b-e066e017b430', 'Yulia Sari Putri', 'bypass', 'Software Developer', 'Bypass', '01/01/1993', '081111234976', 'YuliaSariPutri.jpg', 'yulia111@gmail.com', '12345', 'engineer', '2019-12-15 09:30:23', '2019-12-15 09:32:07'),
('bbac7a23-d3a8-5690-a293-9559fe8e2d68', 'Moses Lo', 'Moses Lo Adalah pendiri dan CEO Xendit yang ditulis oleh Forbes sebagai orang Indonesia. Nama Moses sendiri masuk dalam kategori Finance & Venture Capital \'Forbes 30 Under 30 Asia\'.', 'Founder and CEO at Xendit', 'Ciamis, Jawa Barat', '01/01/1991', '081111234777', 'MosesLo.jpg', 'moses.lo@gmail.com', '12345', 'engineer', '2019-12-15 07:16:54', '2019-12-15 07:22:30'),
('bc7ccdf5-2ccb-5508-a370-78275bc6efd0', 'Muhammad Alfatih Timur', 'Forbes memilih Muhammad Alfatih Timur biasa disapa Timmy sebagai kandidat yang berbakat dalam social entreprise. Berawal dari pembelajaran di Rumah Perubahan milik Rhenald Kasali dan pengalaman hidup di pulau Buru, ia kemudian merintis kegiatan sosial melalui starup KitaBisa. Sejak tahun 2013, Timmy telah menangani berbagai proyek sosial yang diusulkan masyarakat. Setelah memeriksa kelayakannya, i', 'Co-Founder & CEO', 'Bukit tinggi', '01/01/1991', '081111234777', 'AlfatihTimur.jpg', 'alfatihtimur@yahoo.com', '12345', 'engineer', '2019-12-15 07:27:17', '0000-00-00 00:00:00'),
('c9add0b0-101c-582d-80f6-9fadea7cf260', 'Sofi Fitriyah', 'bypass', 'Software Developer', 'Bypass', '01/01/1996', '081111234567', 'SofiFitriyah.jpg', 'sofi111@gmail.com', '12345', 'engineer', '2019-12-15 09:35:08', '2019-12-15 09:37:04'),
('d3139988-1cc6-5049-b329-d4b982ebc52c', 'Leonika Sari Njoto Boedioetomo', 'Leonika Sari Njoto Boedioetomo merupakan penggagas dan pendiri Reblood, perusahaan startup yang bergerak dibidang kesehatan dengan menyediakan informasi dan akses bagi para pendonor darah.', 'Social Entrepreneur Leader', 'Surabaya', '18/08/1993', '081111234555', 'LeonikaSariNjotoBoedioetomo.jpg', 'leonikasari@gmail.com', '12345', 'engineer', '2019-12-15 07:14:36', '2019-12-15 07:18:53'),
('d62da9ba-60b7-5536-8de5-0c8d7619d864', 'Farlin Yosry', 'bypass', 'Web Developer', 'Bypass', '01/01/1993', '081111234567', 'FarlinYosry.jpg', 'farlin111@gmail.com', '12345', 'engineer', '2019-12-15 09:48:21', '0000-00-00 00:00:00'),
('e94e716f-b657-5faf-99de-0821f4b29d35', 'Reni Wijayanti', 'bypass', 'Software Engineer', 'Bypass', '01/01/1995', '081111234976', 'ReniWijayanti.jpg', 'reni111@gmail.com', '12345', 'engineer', '2019-12-15 09:34:04', '0000-00-00 00:00:00'),
('f5358229-e0da-59da-b8b2-20768aee38fe', 'Heni Sri Sundani Jaladara', 'Heni Sri Sundani (lahir di Ciamis, Jawa Barat, 2 Mei 1987; umur 32 tahun) adalah seorang tokoh pendidikan asal Jawa Barat yang melakukan banyak pengabdian dengan membagikan pengajaran kepada anak-anak petani dan TKI. Karena itu, sebuah gerakan yang ia namai \"Anak Petani Cerdas\" mengusung 3 program utama, yakni kecerdadan di linguistik, literasi, dan logika.', 'Co-Founder & CEO', 'Jawa Barat', '02/05/1987', '081111234990', 'HeniSriSundari.jpg', 'alfatihtimur@yahoo.com', '12345', 'engineer', '2019-12-15 09:26:19', '2019-12-15 09:27:22');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_companies`
--
ALTER TABLE `tb_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_engineers`
--
ALTER TABLE `tb_engineers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
