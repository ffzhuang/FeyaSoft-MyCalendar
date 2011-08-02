/**
 * FeyaSoft MyCalendar
 * Copyright(c) 2006-2010, FeyaSoft Inc. All right reserved.
 * info@feyasoft.com
 * http://www.feyasoft.com
 *
 * Please read license first before your use myCalendar, For more detail
 * information, please can visit our link: http://www.feyasoft.com.
 *
 * You need buy one of the Feyasoft's License if you want to use MyCalendar in
 * your product. You must not remove, obscure or interfere with any FeyaSoft
 * copyright, acknowledgment, attribution, trademark, warning or disclaimer
 * statement affixed to, incorporated in or otherwise applied in connection
 * with the Software and User Interface.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE IF NOT EXISTS `calendar_event` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `userId` bigint(255) NOT NULL,
  `calendarId` bigint(255) NOT NULL,
  `repeatType` longtext NOT NULL,
  `startTime` varchar(255) NOT NULL,
  `endTime` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL,
  `description` longtext,
  `subject` varchar(255) DEFAULT NULL,
  `update_date` datetime NOT NULL,
  `locked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2A9BEA59743E7F7` (`calendarId`),
  KEY `FK2A9BEA59581C403A` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `calendar_event_reminder` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `eventId` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `early` int(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `alerted` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `calendar_setting` (
  `userId` int(255) NOT NULL,
  `hourFormat` varchar(255) DEFAULT NULL,
  `dayFormat` varchar(255) DEFAULT NULL,
  `weekFormat` varchar(255) DEFAULT NULL,
  `monthFormat` varchar(255) DEFAULT NULL,
  `fromtoFormat` varchar(255) DEFAULT NULL,
  `activeStartTime` varchar(255) NOT NULL,
  `activeEndTime` varchar(255) NOT NULL,
  `createByDblclick` tinyint(1) NOT NULL,
  `hideInactiveRow` tinyint(1) NOT NULL,
  `singleDay` tinyint(1) NOT NULL,
  `language` varchar(255) NOT NULL,
  `intervalSlot` int(255) NOT NULL DEFAULT '30',
  `startDay` varchar(255) NOT NULL DEFAULT '0',
  `readOnly` tinyint(1) DEFAULT NULL,
  `initialView` int(11) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `calendar_setting` (`userId`, `hourFormat`, `dayFormat`, `weekFormat`, `monthFormat`, `fromtoFormat`, `activeStartTime`, `activeEndTime`, `createByDblclick`, `hideInactiveRow`, `singleDay`, `language`, `intervalSlot`, `startDay`, `readOnly`, `initialView`) VALUES
(1, '24', 'l M d Y', 'm/d(D)', 'm/d', 'm/d/Y', '09:00', '19:00', 0, 0, 0, 'en', 30, '0', 0, 1);


CREATE TABLE IF NOT EXISTS `calendar_type` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL,
  `description` longtext,
  `hide` tinyint(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7503A39B581C403A` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_show` bit(1) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;


INSERT INTO `user` (`id`, `description`, `email`, `email_show`, `enabled`, `first_name`, `last_name`, `passwd`, `username`) VALUES
(1, 'demo', 'demo', '', '', 'demo', 'demo', 'demo', 'demo');
