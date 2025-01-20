-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS estivage;

-- Select the database
USE estivage;

-- Insert sample users (using BCrypt encoded passwords - 'password' for all users)
INSERT INTO users (id, username, password) VALUES
(1, 'admin', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6'),
(2, 'user1', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6'),
(3, 'user2', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6');

-- Insert vacation centers with pricePerNight
INSERT INTO estivage_centre (id, name, type, city, adress, rating, photos, title, des, tel, responsable, pricePerNight) VALUES
(1, 'Seaside Resort', 'RESORT', 'Bejaia', '123 Beach Road', 5, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Seaside_Resort/homePage.jpeg', 'Luxury Beach Resort', 
'Beautiful beachfront resort with panoramic views', '+213555123456', 'Ahmed Benali', 1200.00),

(2, 'Mountain Lodge', 'LODGE', 'Tizi Ouzou', '45 Mountain View', 4, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Mountain_Lodge/homePage.webp', 'Cozy Mountain Retreat', 
'Peaceful mountain lodge surrounded by nature', '+213555234567', 'Lynda Meziani', 900.00),

(3, 'City Hotel', 'HOTEL', 'Oran', '78 Downtown Street', 4, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/CityHotel/homePage.jpg', 'Modern City Hotel', 
'Contemporary hotel in the heart of Oran', '+213555345678', 'Karim Hadj', 800.00);

-- Add photos for centers
INSERT INTO estivage_centre_photos (id, estivage_centre_id, photo) VALUES
(1, 1, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Seaside_Resort/slides/slide1.jpg'),
(2, 1, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Seaside_Resort/slides/slide2.jpg'),
(3, 1, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Seaside_Resort/slides/slide3.jpg'),
(4, 2, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Mountain_Lodge/Slides/slide1.jpeg'),
(5, 2, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Mountain_Lodge/Slides/slide2.jpeg'),
(6, 2, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/Mountain_Lodge/Slides/slide3.jpg'),
(7, 3, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/CityHotel/Slides/slide1.jpg'),
(8, 3, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/CityHotel/Slides/slide2.jpeg'),
(9, 3, 'https://notion-images-upload.s3.eu-west-1.amazonaws.com/assets/CityHotel/Slides/slide3.jpg');

-- Create products (rooms) for centers
INSERT INTO estivage_produit (id, title, des, max_people, estivage_centre_id) VALUES
(1, 'Deluxe Ocean Suite', 'Spacious suite with ocean view and private balcony', 4, 1),
(2, 'Beach View Room', 'Comfortable room with beach views', 2, 1),
(3, 'Family Beach Suite', 'Large suite ideal for families', 6, 1),
(4, 'Mountain View Chalet', 'Cozy chalet with panoramic mountain views', 4, 2),
(5, 'Forest Cabin', 'Private cabin in the woods', 2, 2),
(6, 'City Executive Room', 'Modern room for business travelers', 2, 3);

-- Create sample reservations with new fields
INSERT INTO estivage_reservation (
    id, 
    dateDeDebut, 
    dateDeFin, 
    numberOfNights,
    pricePerNight,
    TotalPrice,
    estivage_produit_id, 
    user_id
) VALUES
(1, '2024-07-01 14:00:00', '2024-07-08 12:00:00', 7, 12000.00, 84000.00, 1, 2),
(2, '2024-07-16 14:00:00', '2024-07-23 12:00:00', 7, 9000.00, 63000.00, 4, 3),
(3, '2024-08-01 14:00:00', '2024-08-08 12:00:00', 7, 12000.00, 84000.00, 2, 2);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;