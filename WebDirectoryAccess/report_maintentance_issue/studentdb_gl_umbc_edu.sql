-- phpMyAdmin SQL Dump
-- version 4.0.10.8
-- http://www.phpmyadmin.net
--
-- Host: studentdb.gl.umbc.edu
-- Generation Time: Mar 16, 2015 at 09:41 PM
-- Server version: 5.5.13-log
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tamtran1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Airport Location Table`
--

CREATE TABLE IF NOT EXISTS `Airport Location Table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Location` varchar(10) NOT NULL,
  `Longitude` double NOT NULL,
  `Latitude` double NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `CSE001`
--

CREATE TABLE IF NOT EXISTS `CSE001` (
  `Issue` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CSE001`
--

INSERT INTO `CSE001` (`Issue`) VALUES
('Power Out'),
('Elevator Down'),
('No Lights'),
('Other');

-- --------------------------------------------------------

--
-- Table structure for table `CSE01`
--

CREATE TABLE IF NOT EXISTS `CSE01` (
  `Issue` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CSE01`
--

INSERT INTO `CSE01` (`Issue`) VALUES
('Power Out'),
('Elevator Down'),
('No Lights'),
('Other');

-- --------------------------------------------------------

--
-- Table structure for table `CSE02`
--

CREATE TABLE IF NOT EXISTS `CSE02` (
  `Issue` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CSE02`
--

INSERT INTO `CSE02` (`Issue`) VALUES
('Too Hot'),
('Too Cold'),
('Leak'),
('Noise'),
('Smell'),
('Other');

-- --------------------------------------------------------

--
-- Table structure for table `CSE03`
--

CREATE TABLE IF NOT EXISTS `CSE03` (
  `Issue` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CSE03`
--

INSERT INTO `CSE03` (`Issue`) VALUES
('Toilet Issue'),
('Sink Issue'),
('Ceiling Leak'),
('Pipe Leaking'),
('Sprinkler Issue'),
('Other');

-- --------------------------------------------------------

--
-- Table structure for table `CSE04`
--

CREATE TABLE IF NOT EXISTS `CSE04` (
  `Issue` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CSE04`
--

INSERT INTO `CSE04` (`Issue`) VALUES
('Tree Issue'),
('Shrub Issue'),
('Recycling Issue'),
('Ice Issues'),
('Snow Issues'),
('Other');

-- --------------------------------------------------------

--
-- Table structure for table `Customer Profile Table`
--

CREATE TABLE IF NOT EXISTS `Customer Profile Table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Street Address` varchar(60) NOT NULL,
  `City` varchar(30) NOT NULL,
  `State` char(2) NOT NULL,
  `Zip Code` int(5) unsigned NOT NULL,
  `Customer Avatar` text,
  `Email` varchar(30) NOT NULL,
  `Phone` int(11) NOT NULL,
  `Register Date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Customer Request`
--

CREATE TABLE IF NOT EXISTS `Customer Request` (
  `multitenant_id` int(8) NOT NULL AUTO_INCREMENT,
  `doc_no` int(8) NOT NULL,
  `status_code` varchar(20) NOT NULL,
  `proposal` varchar(15) DEFAULT NULL,
  `requestor` varchar(25) DEFAULT NULL,
  `req_date` date DEFAULT NULL,
  `desired_date` date DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `long_desc` varchar(4000) DEFAULT NULL,
  `region_code` varchar(15) NOT NULL,
  `fac_id` varchar(15) NOT NULL,
  `bldg` varchar(15) NOT NULL,
  `location_code` varchar(15) DEFAULT NULL,
  `loc_id` varchar(34) DEFAULT NULL,
  `budget` decimal(12,4) DEFAULT NULL,
  `contact` varchar(25) DEFAULT NULL,
  `contact_ph` varchar(15) DEFAULT NULL,
  `contact_mc` varchar(50) DEFAULT NULL,
  `problem_code` varchar(15) DEFAULT NULL,
  `wr_comment` varchar(255) DEFAULT NULL,
  `reference_no` varchar(15) DEFAULT NULL,
  `funding_code` varchar(50) DEFAULT NULL,
  `sub_code` varchar(15) DEFAULT NULL,
  `cust_pri` varchar(15) DEFAULT NULL,
  `crt_flag` varchar(1) DEFAULT NULL,
  `login` varchar(128) DEFAULT NULL,
  `ent_date` date DEFAULT NULL,
  `shop` varchar(25) DEFAULT NULL,
  `edit_date` date DEFAULT NULL,
  `edit_clerk` varchar(128) DEFAULT NULL,
  `company_id` varchar(25) DEFAULT NULL,
  `dept_id` varchar(25) DEFAULT NULL,
  `oc_code` varchar(25) DEFAULT NULL,
  `sort_code` varchar(15) DEFAULT NULL,
  `eqp_tag_id` varchar(50) DEFAULT NULL,
  `link_tranx_num` int(16) DEFAULT NULL,
  `planned_yn` varchar(1) DEFAULT NULL,
  `project` varchar(15) DEFAULT NULL,
  `admin_id` varchar(15) DEFAULT NULL,
  `admin_email` varchar(50) DEFAULT NULL,
  `authorizer` varchar(128) DEFAULT NULL,
  `authorizer_email` varchar(50) DEFAULT NULL,
  `default_dist` varchar(1) DEFAULT NULL,
  `order_type` varchar(15) DEFAULT NULL,
  `category` varchar(15) DEFAULT NULL,
  `craft_code` varchar(25) DEFAULT NULL,
  `shop_person` varchar(15) DEFAULT NULL,
  `pri_code` varchar(15) DEFAULT NULL,
  `wo_pri_code` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`multitenant_id`,`doc_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=173 ;

--
-- Dumping data for table `Customer Request`
--

INSERT INTO `Customer Request` (`multitenant_id`, `doc_no`, `status_code`, `proposal`, `requestor`, `req_date`, `desired_date`, `description`, `long_desc`, `region_code`, `fac_id`, `bldg`, `location_code`, `loc_id`, `budget`, `contact`, `contact_ph`, `contact_mc`, `problem_code`, `wr_comment`, `reference_no`, `funding_code`, `sub_code`, `cust_pri`, `crt_flag`, `login`, `ent_date`, `shop`, `edit_date`, `edit_clerk`, `company_id`, `dept_id`, `oc_code`, `sort_code`, `eqp_tag_id`, `link_tranx_num`, `planned_yn`, `project`, `admin_id`, `admin_email`, `authorizer`, `authorizer_email`, `default_dist`, `order_type`, `category`, `craft_code`, `shop_person`, `pri_code`, `wo_pri_code`) VALUES
(172, 0, '', NULL, 'Facilities', NULL, '0000-00-00', '#CSE001B-1 Electrical problems, Power Out, Light switch not working at the Campus. Submitted on: 03-16-2015, 19:41:42', '', 'UMBC', 'Main', '1000', NULL, NULL, NULL, 'Tam Tran', '1234567890', 'tamtran1@umbc.edu', 'CSE001B-1', NULL, NULL, NULL, NULL, NULL, NULL, 'tamtran1', NULL, 'Elec', NULL, NULL, 'UMBC', 'ADMINISTRATION & FINANCE', 'FACILITIES MANAGEMENT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Maintenance', 'Corrective', NULL, NULL, '3-Routine', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Customer Travel History Tabel`
--

CREATE TABLE IF NOT EXISTS `Customer Travel History Tabel` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Airport` varchar(10) NOT NULL,
  `Longitude` double NOT NULL,
  `Latitude` double NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Elevator Down`
--

CREATE TABLE IF NOT EXISTS `Elevator Down` (
  `code` varchar(10) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Elevator Down`
--

INSERT INTO `Elevator Down` (`code`, `description`) VALUES
('C-1', 'Doesn''t work'),
('C-2', 'Call button not working'),
('C-3', 'Noise coming from elevator'),
('C-4', 'Doesn''t stop correctly');

-- --------------------------------------------------------

--
-- Table structure for table `Location`
--

CREATE TABLE IF NOT EXISTS `Location` (
  `Property` int(5) unsigned NOT NULL,
  `Description` varchar(50) NOT NULL,
  `Region` varchar(4) NOT NULL,
  `Facility` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Location`
--

INSERT INTO `Location` (`Property`, `Description`, `Region`, `Facility`) VALUES
(1000, 'Campus', 'UMBC', 'Main'),
(851, 'Biological Sciences', 'UMBC', 'Main'),
(852, 'Albin O. Kuhn Library', 'UMBC', 'Main'),
(854, 'Lecture Hall 1', 'UMBC', 'Main'),
(855, 'Student development and Success Center', 'UMBC', 'Main'),
(856, 'Sondheim Hall', 'UMBC', 'Main'),
(857, 'University Center', 'UMBC', 'Main'),
(858, 'Meyerhoff Chemistry Building', 'UMBC', 'Main'),
(859, 'Lecture Hall 2', 'UMBC', 'Main'),
(860, 'Math/Psychology Building', 'UMBC', 'Main'),
(861, 'Retriever Althelic Center', 'UMBC', 'Main'),
(862, 'Central Plant', 'UMBC', 'Main'),
(863, 'Green House', 'UMBC', 'Main'),
(864, 'Academic Services', 'UMBC', 'Main'),
(865, 'Fine Arts', 'UMBC', 'Main'),
(866, 'Administration', 'UMBC', 'Main'),
(869, 'Susquehanna Hall', 'UMBC', 'Main'),
(870, 'Dining Hall', 'UMBC', 'Main'),
(871, 'WareHouse', 'UMBC', 'Main'),
(872, 'Chesapeake Hall', 'UMBC', 'Main'),
(873, 'Patapsco Hall', 'UMBC', 'Main'),
(876, 'Stadium', 'UMBC', 'Main'),
(877, 'Sherman Hall', 'UMBC', 'Main'),
(878, 'West Hill Apartments', 'UMBC', 'Main'),
(8781, 'West hill-Severn', 'UMBC', 'Main'),
(876, 'West Hill-Chester', 'UMBC', 'Main'),
(8783, 'West Hill-Wye', 'UMBC', 'Main'),
(8784, 'West Hill-Magothy', 'UMBC', 'Main'),
(8785, 'West Hill-Tangier', 'UMBC', 'Main'),
(8786, 'West Hill-Choptank', 'UMBC', 'Main'),
(8787, 'West Hill Office', 'UMBC', 'Main'),
(879, 'Terrace Apartments', 'UMBC', 'Main'),
(8791, 'Terrace-Nanticoke', 'UMBC', 'Main'),
(8792, 'Terrace-Gunpowder', 'UMBC', 'Main'),
(8793, 'Terrace-Monocacy', 'UMBC', 'Main'),
(8794, 'Terrace-Sasafras', 'UMBC', 'Main'),
(8795, 'Terrace-Wicomico', 'UMBC', 'Main'),
(8796, 'Terrace-Antietam', 'UMBC', 'Main'),
(8797, 'Terrace-Chincoteaque', 'UMBC', 'Main'),
(8798, 'Terrace-Tuckahoe', 'UMBC', 'Main'),
(880, 'Hillside Apartments', 'UMBC', 'Main'),
(8801, 'Hillside-Sideling', 'UMBC', 'Main'),
(8802, 'Hillside-Pocomoke', 'UMBC', 'Main'),
(8803, 'Hillside-Manokin', 'UMBC', 'Main'),
(8804, 'Hillside-Patuxent', 'UMBC', 'Main'),
(8805, 'Hillside-Elk', 'UMBC', 'Main'),
(8806, 'Hillside-Deepcreek', 'UMBC', 'Main'),
(8807, 'Hillside-Casselman', 'UMBC', 'Main'),
(8808, 'Hillside-Breton', 'UMBC', 'Main'),
(883, 'Technology Research Center', 'UMBC', 'Main'),
(886, 'Engineering Computer Science', 'UMBC', 'Main'),
(887, 'Technology 2', 'UMBC', 'Main'),
(888, 'Potomac Hall', 'UMBC', 'Main'),
(889, 'Day Care', 'UMBC', 'Main'),
(890, 'Facilities Management', 'UMBC', 'Main'),
(892, 'Physics', 'UMBC', 'Main'),
(893, 'Ericson Hll', 'UMBC', 'Main'),
(894, 'Harbor Hall', 'UMBC', 'Main'),
(895, 'Harbor Hall', 'UMBC', 'Main'),
(895, 'University Commons', 'UMBC', 'Main'),
(896, 'Satellite Plant', 'UMBC', 'Main'),
(897, 'ITE Building', 'UMBC', 'Main'),
(898, 'Public Policy', 'UMBC', 'Main'),
(950, 'Administration Parking Deck', 'UMBC', 'Main'),
(951, 'Commons Garage', 'UMBC', 'Main'),
(952, 'Walker Ave. Garage', 'UMBC', 'Main');

-- --------------------------------------------------------

--
-- Table structure for table `No Lights`
--

CREATE TABLE IF NOT EXISTS `No Lights` (
  `code` varchar(10) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `No Lights`
--

INSERT INTO `No Lights` (`code`, `description`) VALUES
('A-1', 'Room light'),
('A-2', 'Exterior building light'),
('A-3', 'Parking lot light'),
('A-4', 'Hallway light');

-- --------------------------------------------------------

--
-- Table structure for table `Power Out`
--

CREATE TABLE IF NOT EXISTS `Power Out` (
  `code` varchar(10) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Power Out`
--

INSERT INTO `Power Out` (`code`, `description`) VALUES
('B-1', 'Light switch not working'),
('B-2', 'Outlet not working');

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE IF NOT EXISTS `organization` (
  `oc_code` varchar(30) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL,
  `company_id` varchar(30) DEFAULT NULL,
  `dept_id` varchar(30) DEFAULT NULL,
  `active` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`oc_code`, `description`, `company_id`, `dept_id`, `active`) VALUES
('FACILITIES MANAGEMENT', 'FACILITIES MANAGEMENT', 'UMBC', 'ADMINISTRATION & FINANCE', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `problemType`
--

CREATE TABLE IF NOT EXISTS `problemType` (
  `problem_code` varchar(10) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL,
  `shop` varchar(10) DEFAULT NULL,
  `shop_person` varchar(30) DEFAULT NULL,
  `pri_code` varchar(30) DEFAULT NULL,
  `order_type` varchar(30) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `problemType`
--

INSERT INTO `problemType` (`problem_code`, `description`, `shop`, `shop_person`, `pri_code`, `order_type`, `category`) VALUES
('CSE001', 'Electrical problems', 'Elec', '', '3-Routine', 'Maintenance', 'Corrective'),
('CSE01', 'Electrical issues', 'Elec', '', '3-Routine', 'Maintenance', 'Corrective'),
('CSE02', 'A/C and Heating problem', 'Hvac', '', '3-Routine', 'Maintenance', 'Corrective'),
('CSE03', 'Plumbing problem', 'Plmb', '', '3-Routine', 'Maintenance', 'Corrective'),
('CSE04', 'Landscape & Grounds problem', 'Grnd', '', '3-Routine', 'Maintenance', 'Corrective');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `count` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `type` varchar(2) NOT NULL,
  `option1` text NOT NULL,
  `option2` text NOT NULL,
  `option3` text,
  `option4` text,
  `option5` text,
  `answer` text NOT NULL,
  PRIMARY KEY (`count`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`count`, `question`, `type`, `option1`, `option2`, `option3`, `option4`, `option5`, `answer`) VALUES
(1, 'Are you male or female?', 'MC', 'Male', 'Female', NULL, NULL, NULL, 'Male'),
(2, 'Are you currently employed?', 'TF', 'true', 'false', NULL, NULL, NULL, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `requestor`
--

CREATE TABLE IF NOT EXISTS `requestor` (
  `login` varchar(15) DEFAULT NULL,
  `description` text,
  `employee_id` varchar(30) DEFAULT NULL,
  `shop` varchar(15) DEFAULT NULL,
  `company_id` varchar(15) DEFAULT NULL,
  `dept_id` varchar(30) DEFAULT NULL,
  `oc_code` varchar(30) DEFAULT NULL,
  `requestor` varchar(15) DEFAULT NULL,
  `active` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requestor`
--

INSERT INTO `requestor` (`login`, `description`, `employee_id`, `shop`, `company_id`, `dept_id`, `oc_code`, `requestor`, `active`) VALUES
('Facilities', 'Test account for web services with cs-233', NULL, NULL, 'UMBC', 'Administration & Finance', 'Facilities Management', 'Facilities', 'Y');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
