#!/bin/bash

BASE_URL="http://localhost:8080/estivage/api"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="password"

# Function to handle errors
handle_error() {
    if [ $1 -ne 0 ]; then
        echo "Error occurred in previous operation. Exiting..."
        exit 1
    fi
}

################################
# STEP 1: Add Users
################################
echo "Adding users..."
curl -X POST "$BASE_URL/auth/register" -H "Content-Type: application/json" -d '{
    "username": "admin",
    "password": "password"
}'
handle_error $?

curl -X POST "$BASE_URL/auth/register" -H "Content-Type: application/json" -d '{
    "username": "user1",
    "password": "password"
}'
handle_error $?

curl -X POST "$BASE_URL/auth/register" -H "Content-Type: application/json" -d '{
    "username": "user2",
    "password": "password"
}'
handle_error $?

################################
# STEP 2: Login as Admin and Get Token
################################
echo "Authenticating as admin to obtain token..."
response=$(curl -s -X POST "$BASE_URL/auth/login" -H "Content-Type: application/json" -d '{
    "username": "'"$ADMIN_USERNAME"'",
    "password": "'"$ADMIN_PASSWORD"'"
}')
TOKEN=$(echo "$response" | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "Authentication failed. Unable to obtain a token."
    exit 1
fi

echo "Token acquired: $TOKEN"

################################
# STEP 3: Add Vacation Centers
################################
echo "Adding vacation centers..."

curl -X POST "$BASE_URL/asset/estivagecentre/create" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 1,
    "name": "Seaside Resort",
    "type": "RESORT",
    "city": "Bejaia",
    "adress": "123 Beach Road",
    "rating": 5,
    "photos": "seaside1.jpg",
    "title": "Luxury Beach Resort",
    "des": "Beautiful beachfront resort with panoramic views",
    "tel": "+213555123456",
    "responsable": "Ahmed Benali",
    "pricePerNight": 12000.00
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivagecentre/create" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 2,
    "name": "Mountain Lodge",
    "type": "LODGE",
    "city": "Tizi Ouzou",
    "adress": "45 Mountain View",
    "rating": 4,
    "photos": "mountain1.jpg",
    "title": "Cozy Mountain Retreat",
    "des": "Peaceful mountain lodge surrounded by nature",
    "tel": "+213555234567",
    "responsable": "Lynda Meziani",
    "pricePerNight": 9000.00
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivagecentre/create" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 3,
    "name": "City Hotel",
    "type": "HOTEL",
    "city": "Oran",
    "adress": "78 Downtown Street",
    "rating": 4,
    "photos": "city1.jpg",
    "title": "Modern City Hotel",
    "des": "Contemporary hotel in the heart of Oran",
    "tel": "+213555345678",
    "responsable": "Karim Hadj",
    "pricePerNight": 8000.00
}'
handle_error $?

################################
# STEP 4: Add Photos for Centers
################################
echo "Adding photos for vacation centers..."

curl -X POST "$BASE_URL/asset/estivageCentre/1/add/estivagePhotos" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '[
    {"id": 1, "photo": "seaside_view1.jpg"},
    {"id": 2, "photo": "seaside_view2.jpg"},
    {"id": 3, "photo": "seaside_pool.jpg"}
]'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageCentre/2/add/estivagePhotos" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '[
    {"id": 4, "photo": "mountain_view1.jpg"},
    {"id": 5, "photo": "mountain_view2.jpg"}
]'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageCentre/3/add/estivagePhotos" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '[
    {"id": 6, "photo": "city_view1.jpg"}
]'
handle_error $?

################################
# STEP 5: Add Products (Rooms)
################################
echo "Adding products (rooms)..."

curl -X POST "$BASE_URL/asset/estivageProduit/create/1" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 1,
    "title": "Deluxe Ocean Suite",
    "des": "Spacious suite with ocean view and private balcony",
    "max_people": 4
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageProduit/create/1" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 2,
    "title": "Beach View Room",
    "des": "Comfortable room with beach views",
    "max_people": 2
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageProduit/create/1" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 3,
    "title": "Family Beach Suite",
    "des": "Large suite ideal for families",
    "max_people": 6
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageProduit/create/2" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 4,
    "title": "Mountain View Chalet",
    "des": "Cozy chalet with panoramic mountain views",
    "max_people": 4
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageProduit/create/2" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 5,
    "title": "Forest Cabin",
    "des": "Private cabin in the woods",
    "max_people": 2
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivageProduit/create/3" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 6,
    "title": "City Executive Room",
    "des": "Modern room for business travelers",
    "max_people": 2
}'
handle_error $?

################################
# STEP 6: Add Reservations
################################
echo "Adding reservations..."

curl -X POST "$BASE_URL/asset/estivagereservation/create/1" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 1,
    "date_de_debut": "2024-07-01T14:00:00",
    "date_de_fin": "2024-07-08T12:00:00",
    "number_of_nights": 7,
    "pricePerNight": 12000.00,
    "total_price": 84000.00,
    "estivage_reservation_user": 2
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivagereservation/create/4" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 2,
    "date_de_debut": "2024-07-16T14:00:00",
    "date_de_fin": "2024-07-23T12:00:00",
    "number_of_nights": 7,
    "pricePerNight": 9000.00,
    "total_price": 63000.00,
    "estivage_reservation_user": 3
}'
handle_error $?

curl -X POST "$BASE_URL/asset/estivagereservation/create/2" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -d '{
    "id": 3,
    "date_de_debut": "2024-08-01T14:00:00",
    "date_de_fin": "2024-08-08T12:00:00",
    "number_of_nights": 7,
    "pricePerNight": 12000.00,
    "total_price": 84000.00,
    "estivage_reservation_user": 2
}'
handle_error $?

echo "Data population completed successfully!"