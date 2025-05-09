from datetime import date
from sqlalchemy.orm import Session
from db.models import ZipCode

shared_3_4_advice = {
    'early_spring': [
        'Start seeds indoors: Broccoli',
        'Start seeds indoors: Cabbage',
        'Start seeds indoors: Kale',
        'Start seeds indoors: Lettuce',
        'Start seeds indoors: Onions'
    ],
    'late_spring': [
        'Transplant seedlings: Broccoli',
        'Transplant seedlings: Cabbage',
        'Direct sow outdoors: Carrots',
        'Direct sow outdoors: Beets',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach',
        'Direct sow outdoors: Peas'
    ],
    'early_summer': [
        'Transplant seedlings: Tomatoes',
        'Transplant seedlings: Peppers',
        'Transplant seedlings: Eggplants',
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Cucumbers',
        'Direct sow outdoors: Squash'
    ],
    'late_summer': [
        'Direct sow outdoors: Radishes',
        'Direct sow outdoors: Turnips',
        'Direct sow outdoors: Spinach',
        'Direct sow outdoors: Lettuce'
    ],
    'early_fall': [
        'Plant garlic for overwintering',
        'Harvest root vegetables: Carrots, Beets, Potatoes'
    ],
    'late_fall': [
        'Mulch perennials for winter protection',
        'Clean up garden beds and remove debris'
    ],
    'early_winter': [
        'Plan garden layout for next season',
        'Order seeds and gardening supplies'
    ],
    'late_winter': [
        'Start seeds indoors: Tomatoes',
        'Start seeds indoors: Peppers',
        'Start seeds indoors: Eggplants'
    ]
}

shared_5_6_advice = {
    'early_spring': [
        'Start seeds indoors: Broccoli',
        'Start seeds indoors: Cabbage',
        'Start seeds indoors: Lettuce',
        'Start seeds indoors: Spinach',
        'Start seeds indoors: Kale'
    ],
    'late_spring': [
        'Transplant seedlings: Broccoli',
        'Transplant seedlings: Cabbage',
        'Direct sow outdoors: Carrots',
        'Direct sow outdoors: Beets',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach'
    ],
    'early_summer': [
        'Transplant seedlings: Tomatoes',
        'Transplant seedlings: Peppers',
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Cucumbers',
        'Direct sow outdoors: Squash'
    ],
    'late_summer': [
        'Direct sow outdoors: Turnips',
        'Direct sow outdoors: Radishes',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach'
    ],
    'early_fall': [
        'Plant garlic for overwintering'
    ],
    'late_fall': [],
    'early_winter': [],
    'late_winter': [
        'Plan garden layout',
        'Order seeds and supplies'
    ]
}

shared_7_8_advice = {
    'early_spring': [
        'Start seeds indoors: Broccoli',
        'Start seeds indoors: Cabbage',
        'Start seeds indoors: Kale',
        'Start seeds indoors: Lettuce',
        'Start seeds indoors: Tomatoes',
        'Start seeds indoors: Peppers'
    ],
    'late_spring': [
        'Transplant seedlings: Tomatoes',
        'Transplant seedlings: Peppers',
        'Direct sow outdoors: Carrots',
        'Direct sow outdoors: Beets',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach',
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Squash'
    ],
    'early_summer': [
        'Transplant seedlings: Eggplants',
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Cucumbers',
        'Direct sow outdoors: Melons',
        'Direct sow outdoors: Peppers'
    ],
    'late_summer': [
        'Direct sow outdoors: Radishes',
        'Direct sow outdoors: Turnips',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach',
        'Harvest summer crops: Tomatoes, Peppers, Squash'
    ],
    'early_fall': [
        'Plant garlic for overwintering',
        'Plant onions for overwintering',
        'Harvest root vegetables: Carrots, Beets, Potatoes'
    ],
    'late_fall': [
        'Mulch perennials for winter protection',
        'Clean up garden beds and remove debris'
    ],
    'early_winter': [
        'Plan garden layout for next season',
        'Order seeds and gardening supplies'
    ],
    'late_winter': [
        'Start seeds indoors: Tomatoes, Peppers, Eggplants',
        'Start seeds indoors: Melons'
    ]
}

shared_9_10a_advice = {
    'early_spring': [
        'Start seeds indoors: Broccoli',
        'Start seeds indoors: Cabbage',
        'Start seeds indoors: Kale',
        'Start seeds indoors: Lettuce',
        'Start seeds indoors: Tomatoes',
        'Start seeds indoors: Peppers',
        'Start seeds indoors: Melons'
    ],
    'late_spring': [
        'Transplant seedlings: Tomatoes',
        'Transplant seedlings: Peppers',
        'Transplant seedlings: Melons',
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Squash',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Cucumbers'
    ],
    'early_summer': [
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Cucumbers',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Peppers',
        'Direct sow outdoors: Squash',
        'Direct sow outdoors: Eggplants'
    ],
    'late_summer': [
        'Direct sow outdoors: Radishes',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach',
        'Direct sow outdoors: Turnips',
        'Harvest summer crops: Tomatoes, Peppers, Squash'
    ],
    'early_fall': [
        'Plant garlic for overwintering',
        'Harvest root vegetables: Carrots, Beets, Potatoes'
    ],
    'late_fall': [
        'Mulch perennials for winter protection',
        'Clean up garden beds and remove debris'
    ],
    'early_winter': [
        'Plan garden layout for next season',
        'Order seeds and gardening supplies',
        'Start seeds indoors: Tomatoes, Peppers, Eggplants, Melons'
    ],
    'late_winter': [
        'Start seeds indoors: Tomatoes, Peppers, Eggplants',
        'Start seeds indoors: Melons, Okra'
    ]
}

shared_10b_11b_advice = {
    'early_spring': [
        'Start seeds indoors: Broccoli',
        'Start seeds indoors: Lettuce',
        'Start seeds indoors: Kale',
        'Start seeds indoors: Tomatoes',
        'Start seeds indoors: Peppers',
        'Start seeds indoors: Melons',
        'Start seeds indoors: Herbs (Basil, Oregano, Mint)'
    ],
    'late_spring': [
        'Transplant seedlings: Tomatoes',
        'Transplant seedlings: Peppers',
        'Transplant seedlings: Melons',
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Squash',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Cucumbers',
        'Plant perennial herbs: Rosemary, Thyme'
    ],
    'early_summer': [
        'Direct sow outdoors: Beans',
        'Direct sow outdoors: Squash',
        'Direct sow outdoors: Corn',
        'Direct sow outdoors: Cucumbers',
        'Direct sow outdoors: Okra',
        'Transplant seedlings: Eggplants',
        'Transplant seedlings: Peppers',
        'Plant tropical fruits: Mango, Papaya, Pineapple (if space allows)'
    ],
    'late_summer': [
        'Direct sow outdoors: Radishes',
        'Direct sow outdoors: Lettuce',
        'Direct sow outdoors: Spinach',
        'Direct sow outdoors: Turnips',
        'Harvest summer crops: Tomatoes, Peppers, Squash',
        'Plant sweet potatoes and other root vegetables'
    ],
    'early_fall': [
        'Plant garlic for overwintering',
        'Harvest root vegetables: Carrots, Beets, Potatoes',
        'Transplant cool-weather crops: Kale, Chard, Broccoli'
    ],
    'late_fall': [
        'Mulch perennials for winter protection',
        'Clean up garden beds and remove debris',
        'Start planting cover crops for soil health'
    ],
    'early_winter': [
        'Plan garden layout for next season',
        'Order seeds and gardening supplies',
        'Start seeds indoors: Tomatoes, Peppers, Melons'
    ],
    'late_winter': [
        'Start seeds indoors: Tomatoes, Peppers, Eggplants, Melons',
        'Start seeds indoors: Tropical herbs (Lemongrass, Kaffir lime)'
    ]
}

PLANTING_ADVICE = {
    '3a': shared_3_4_advice,
    '3b': shared_3_4_advice,
    '4a': shared_3_4_advice,
    '4b': shared_3_4_advice,
    '5a': shared_5_6_advice,
    '5b': shared_5_6_advice,
    '6a': shared_5_6_advice,
    '6b': shared_5_6_advice,
    '7a': shared_7_8_advice,
    '7b': shared_7_8_advice,
    '8a': shared_7_8_advice,
    '8b': shared_7_8_advice,
    '9a': shared_9_10a_advice,
    '9b': shared_9_10a_advice,
    '10a': shared_9_10a_advice,
    '10b': shared_10b_11b_advice,
    '11a': shared_10b_11b_advice,
    '11b': shared_10b_11b_advice
}

def get_zone_by_zip(zip_code: str, db: Session):
    zip_entry = db.query(ZipCode).filter(ZipCode.zip_code == zip_code).first()
    if zip_entry and zip_entry.zone:
        return zip_entry.zone.name  # Access the zone's name (e.g., "6a")
    return None

def get_current_half_season(today: date = date.today()) -> str:
    y = today.year

    ranges = [
        ('early_spring',  date(y, 3, 20),  date(y, 5, 7)),
        ('late_spring',   date(y, 5, 8),   date(y, 6, 15)),
        ('early_summer',  date(y, 6, 16),  date(y, 8, 1)),
        ('late_summer',   date(y, 8, 2),   date(y, 9, 22)),
        ('early_fall',    date(y, 9, 23),  date(y, 11, 6)),
        ('late_fall',     date(y, 11, 7),  date(y, 12, 20)),
        ('early_winter',  date(y, 12, 21), date(y + 1, 2, 4)),
        ('late_winter',   date(y + 1, 2, 5), date(y + 1, 3, 19)),
    ]

    for season_name, start, end in ranges:
        if start <= today <= end:
            return season_name
    return 'unknown'

def get_plant_advice(zip_code: str, db: Session, today: date = date.today()) -> dict:
    zone = get_zone_by_zip(zip_code, db)
    if not zone:
        return {"error": "Zone not found for ZIP code."}

    current_half_season = get_current_half_season(today)
    crops = PLANTING_ADVICE.get(zone, {}).get(current_half_season, [])

    return {
        "zone": zone,
        "season": current_half_season.replace('_', ' ').title(),
        "suggested_crops": crops
    }