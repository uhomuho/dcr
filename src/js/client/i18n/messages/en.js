export default {
	"err": "Something went wrong",
	"404": {
		"title": "Error 404",
		"not_found": "Page not found",
		"to_main": "To main"
	},
	"heading": {
		"reviews": "Reviews",
		"total": {
			cars: ({ plural: pl }) => pl([ "car", "cars" ]),
			homepage: ({ linked: ln, named: nm }) => `Total ${nm("total")} ${ln("heading.total.cars")}<br>for any taste`,
			brand: ({ linked: ln, named: nm }) => `and ${nm("total")} more ${ln("heading.total.cars")}<br>for any taste` 
		}
	},
	"title": {
		"policy": "Privacy policy"
	},
	"homepage": {
		"heading": {
			"rent": "Rent a car<br>in Dubai",
			"subtitle": "All the world's best cars<br>&ndash; all in the dcr motors fleet!"
		},
		"brands": {
			"all": "All"
		}
	},
	"cars": {
		"rent": "Rent",
		"litres": "l",
		"horsepower": "hp",
		"year": "y.",
		"seconds": "s.",
		"kmh": "km/h"
	},
	"pagination": {
		"page": "%s page"
	},
	"footer": {
		"socials": "Follow us —",
		"questions": "Any questions? Contact us:",
		"links": {
			"affiliate": "Affiliate program",
			"contacts": "Contacts"
		},
		"privacy": "Privacy policy",
		"sitemap": "Site map"
	},
	"order": {
		"opener": "Checkout",
		"closer": "Specifications",
		"title": "Checkout",
		"set_address": "Specify address",
		"submit": "Order",
		"not_selected": "Not selected",
		"stock": "off",
		"accepted": "Accepted:",
		"booking": "Booking:",
		"thanks": [
			"Thank you for your request!",
			"We contact you shortly"
		],
		"empty": {
			"order": "Fill in all order parameters!",
			"member": "Fill in all personal data marked with \"*\"!"
		},
		"invalid": {
			"order": "Not all order parameters were filled in correctly!",
			"member": "Not all personal data was filled in correctly!"
		},
		"receiving": {
			"title": "Pick-up",
			"place": "Pick-up place",
			"address": "Please enter the pick-up address",
			"date": "Pick-up date",
			"time": "Pick-up time"
		},
		"return": {
			"title": "Drop-off",
			"place": "Drop-off place",
			"address": "Please enter the drop-off address",
			"date": "Drop-off date",
			"time": "Drop-off time"
		},
		"user": {
			"title": "Your details",
			"fio": "Full name in Latin without accents *",
			"birth": "Date of birth *",
			"birth_placeholder": "DD.MM.YYYY",
			"email": "Email *",
			"country": "Country",
			"phone": {
				"input": "Contact phone number*",
				"extra": "Additional phone number",
				"messengers": "Please specify instant messengers on this phone number. We will try to use them first to contact you",
				"country_code": "Country code"
			},
			"comment": "Comment",
			"ref": "Referral code",
			"accept": {
				"terms": "I accept <a href=\"/terms/\" target=\"_blank\">the Terms of use</a>",
				"policy": "I have read <a href=\"/policy/\" target=\"_blank\">the Privacy policy</a>"
			}
		},
		"car": {
			"cost": "Cost",
			"free_del": "Free delivery",
			"fast_del": "Fast delivery",
			"book": "Book now",
			"tech_spec": {
				"title": "Engine",
				"engine_type": "Type",
				"power": "Power",
				"transmission": "Transmission",
				"drive_unit": "Drive unit"
			},
			"speed_spec": {
				"title": "Speed",
				"max_speed": "Max. speed",
				"to_100": "Acceleration to 100 км/ч"
			},
			"other_spec": {
				"title": "Other",
				"seats": "Number of seats",
				"fuel": "Fuel",
				"op_eq": "Optional equipment",
				"nav_sys": "Navigation system"
			}
		}
	},
	"affiliate": {
		"title": "Become a partner of DCR Motors",
		"register": {	
			"no_payments": "Payout methods not setup yet",
			"title": "Registration",
			"btn": "Register",
			"fio": {
				"title": "Your full name",
				"1": "Name",
				"2": "Surname"
			},
			"country": "Country",
			"choose_country": "Choose country",
			"phone": "Phone number",
			"email": "Email",
			"password": "Password",
			"payoutWay": "Way of recieving payouts",
			"choose_payout": "Choose payouts way",
			"comission": "comission",
			"requisites": "Requisites",
			"ref": "Invitation number",
			"fill_all": "Fill all required fields!",
			"fill_incorrect": {
				"phone": "The \"Phone number\" field is filled incorrectrly!",
				"email": "The \"Email\" field is filled incorrectrly!",
				"requisites": "The \"Requisites\" field is filled incorrectrly!",
				"password": "The \"Password\" field is filled incorrectrly!"
			},
			"email_exist": "User with this Email already exists",
			"phone_exist": "User with this phone number already exists",
			"both_exist": "User with this Email and phone number already exists"
		},
		"login": {
			"title": "Sign in",
			"btn": "Sign in",
			"no_user": "User with this Email does not exist",
			"wrong_pass": "Password is incorrect"
		},
		"conditions": {
			"after_reservation": "<b>{{num}}$</b><span>guaranteed after payment of the reservation</span>",
			"after_payment": "<b>{{num}}%</b><span>after paying the full cost of the car</span>",
			"ref": "<b>{{num}}%</b><span>from refferal income</span>",
			"disc": "<b>{{num}}%</b><span>discount for members you invite</span>"
		},
		"who_can": {
			"title": "Who can earn money with us?",
			"items": {
				"0": "Webmasters",
				"1": "Travel bloggers",
				"2": "Youtube, Instagram, TikTok influencers",
				"3": "Online travel agencies, hotels, airlines, etc",
				"4": "PPC specialists"
			}
		},
		"how_start": {
			"title": "How to get started?",
			"items": {
				"1": "Register in our affiliate programm.",
				"2": "Copy the widget code and paste it on your website.",
				"3": "Start earning!"
			}
		},
		"payout": {
			"title": "Payments are made once a week"
		}
	}
}