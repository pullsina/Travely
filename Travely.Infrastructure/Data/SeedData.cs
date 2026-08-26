using Microsoft.EntityFrameworkCore;
using Travely.Shared.Entities;
using Travely.Shared.Enums;

namespace Travely.Infrastructure.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder builder)
        {
            builder.Entity<Country>().HasData(
                new Country
                {
                    Id = 1,
                    Name = "Albania",
                    Capital = "Tirana",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Balkan country is known for its Adriatic and Ionian coastline.",
                    FlagUrl = "/images/countries/flags/albania.svg",
                    FactUrl = "/images/countries/hints/albania.jpg"
                },
                new Country
                {
                    Id = 2,
                    Name = "Andorra",
                    Capital = "Andorra la Vella",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This tiny country lies in the Pyrenees between France and Spain.",
                    FlagUrl = "/images/countries/flags/andorra.svg",
                    FactUrl = "/images/countries/hints/andorra.jpg"
                },
                new Country
                {
                    Id = 3,
                    Name = "Austria",
                    Capital = "Vienna",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for classical music, the Alps and schnitzel.",
                    FlagUrl = "/images/countries/flags/austria.svg",
                    FactUrl = "/images/countries/hints/austria.jpg"
                },
                new Country
                {
                    Id = 4,
                    Name = "Belarus",
                    Capital = "Minsk",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This landlocked Eastern European country borders Poland, Lithuania, Latvia, Russia and Ukraine.",
                    FlagUrl = "/images/countries/flags/belarus.svg",
                    FactUrl = "/images/countries/hints/belarus.jpg"
                },
                new Country
                {
                    Id = 5,
                    Name = "Belgium",
                    Capital = "Brussels",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for waffles, chocolate and being home to many EU institutions.",
                    FlagUrl = "/images/countries/flags/belgium.svg",
                    FactUrl = "/images/countries/hints/belgium.jpg"
                },
                new Country
                {
                    Id = 6,
                    Name = "Bosnia and Herzegovina",
                    Capital = "Sarajevo",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Balkan country is known for Mostar's famous old bridge.",
                    FlagUrl = "/images/countries/flags/bosnia_and_herzegovina.svg",
                    FactUrl = "/images/countries/hints/bosnia_and_herzegovina.jpg"
                },
                new Country
                {
                    Id = 7,
                    Name = "Bulgaria",
                    Capital = "Sofia",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Balkan country is known for rose oil and its Black Sea coast.",
                    FlagUrl = "/images/countries/flags/bulgaria.svg",
                    FactUrl = "/images/countries/hints/bulgaria.jpg"
                },
                new Country
                {
                    Id = 8,
                    Name = "Croatia",
                    Capital = "Zagreb",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Adriatic country is famous for Dubrovnik and its many islands.",
                    FlagUrl = "/images/countries/flags/croatia.svg",
                    FactUrl = "/images/countries/hints/croatia.jpg"
                },
                new Country
                {
                    Id = 9,
                    Name = "Czechia",
                    Capital = "Prague",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Central European country is famous for Prague Castle and its brewing tradition.",
                    FlagUrl = "/images/countries/flags/czechia.svg",
                    FactUrl = "/images/countries/hints/czechia.jpg"
                },
                new Country
                {
                    Id = 10,
                    Name = "Denmark",
                    Capital = "Copenhagen",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Nordic country is known for LEGO, bicycles and hygge.",
                    FlagUrl = "/images/countries/flags/denmark.svg",
                    FactUrl = "/images/countries/hints/denmark.jpg"
                },
                new Country
                {
                    Id = 11,
                    Name = "Estonia",
                    Capital = "Tallinn",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Baltic country is known for its digital society and medieval old town.",
                    FlagUrl = "/images/countries/flags/estonia.svg",
                    FactUrl = "/images/countries/hints/estonia.jpg"
                },
                new Country
                {
                    Id = 12,
                    Name = "Finland",
                    Capital = "Helsinki",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Nordic country is famous for saunas, lakes and the northern lights.",
                    FlagUrl = "/images/countries/flags/finland.svg",
                    FactUrl = "/images/countries/hints/finland.jpg"
                },
                new Country
                {
                    Id = 13,
                    Name = "France",
                    Capital = "Paris",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for croissants, baguettes and the Eiffel Tower.",
                    FlagUrl = "/images/countries/flags/france.svg",
                    FactUrl = "/images/countries/hints/france.jpg"
                },
                new Country
                {
                    Id = 14,
                    Name = "Germany",
                    Capital = "Berlin",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is known for the Brandenburg Gate, autobahns and Oktoberfest.",
                    FlagUrl = "/images/countries/flags/germany.svg",
                    FactUrl = "/images/countries/hints/germany.jpg"
                },
                new Country
                {
                    Id = 15,
                    Name = "Greece",
                    Capital = "Athens",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Mediterranean country is famous for ancient temples and thousands of islands.",
                    FlagUrl = "/images/countries/flags/greece.svg",
                    FactUrl = "/images/countries/hints/greece.jpg"
                },
                new Country
                {
                    Id = 16,
                    Name = "Hungary",
                    Capital = "Budapest",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "The Danube divides this country's capital into historic Buda and Pest.",
                    FlagUrl = "/images/countries/flags/hungary.svg",
                    FactUrl = "/images/countries/hints/hungary.jpg"
                },
                new Country
                {
                    Id = 17,
                    Name = "Iceland",
                    Capital = "Reykjavík",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Nordic island country is famous for volcanoes, geysers and hot springs.",
                    FlagUrl = "/images/countries/flags/iceland.svg",
                    FactUrl = "/images/countries/hints/iceland.jpg"
                },
                new Country
                {
                    Id = 18,
                    Name = "Ireland",
                    Capital = "Dublin",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This island country is associated with shamrocks, Guinness and green landscapes.",
                    FlagUrl = "/images/countries/flags/ireland.svg",
                    FactUrl = "/images/countries/hints/ireland.jpg"
                },
                new Country
                {
                    Id = 19,
                    Name = "Italy",
                    Capital = "Rome",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for pizza, pasta and the Colosseum.",
                    FlagUrl = "/images/countries/flags/italy.svg",
                    FactUrl = "/images/countries/hints/italy.jpg"
                },
                new Country
                {
                    Id = 20,
                    Name = "Latvia",
                    Capital = "Riga",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Baltic country has a long coastline on the Baltic Sea.",
                    FlagUrl = "/images/countries/flags/latvia.svg",
                    FactUrl = "/images/countries/hints/latvia.jpg"
                },
                new Country
                {
                    Id = 21,
                    Name = "Liechtenstein",
                    Capital = "Vaduz",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Hard,
                    Fact = "This tiny Alpine principality lies between Switzerland and Austria.",
                    FlagUrl = "/images/countries/flags/liechtenstein.svg",
                    FactUrl = "/images/countries/hints/liechtenstein.jpg"
                },
                new Country
                {
                    Id = 22,
                    Name = "Lithuania",
                    Capital = "Vilnius",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Baltic country is the southernmost of the three Baltic states.",
                    FlagUrl = "/images/countries/flags/lithuania.svg",
                    FactUrl = "/images/countries/hints/lithuania.jpg"
                },
                new Country
                {
                    Id = 23,
                    Name = "Luxembourg",
                    Capital = "Luxembourg",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This small country is one of the world's only remaining grand duchies.",
                    FlagUrl = "/images/countries/flags/luxembourg.svg",
                    FactUrl = "/images/countries/hints/luxembourg.jpg"
                },
                new Country
                {
                    Id = 24,
                    Name = "Malta",
                    Capital = "Valletta",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This small Mediterranean island country lies south of Sicily.",
                    FlagUrl = "/images/countries/flags/malta.svg",
                    FactUrl = "/images/countries/hints/malta.jpg"
                },
                new Country
                {
                    Id = 25,
                    Name = "Moldova",
                    Capital = "Chișinău",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Hard,
                    Fact = "This landlocked Eastern European country is well known for its wine cellars.",
                    FlagUrl = "/images/countries/flags/moldova.svg",
                    FactUrl = "/images/countries/hints/moldova.jpg"
                },
                new Country
                {
                    Id = 26,
                    Name = "Monaco",
                    Capital = "Monaco",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This tiny Mediterranean state is famous for Monte Carlo and Formula 1.",
                    FlagUrl = "/images/countries/flags/monaco.svg",
                    FactUrl = "/images/countries/hints/monaco.jpg"
                },
                new Country
                {
                    Id = 27,
                    Name = "Montenegro",
                    Capital = "Podgorica",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small Balkan country has a dramatic Adriatic coastline and the Bay of Kotor.",
                    FlagUrl = "/images/countries/flags/montenegro.svg",
                    FactUrl = "/images/countries/hints/montenegro.jpg"
                },
                new Country
                {
                    Id = 28,
                    Name = "Netherlands",
                    Capital = "Amsterdam",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for canals, tulips, windmills and bicycles.",
                    FlagUrl = "/images/countries/flags/netherlands.svg",
                    FactUrl = "/images/countries/hints/netherlands.jpg"
                },
                new Country
                {
                    Id = 29,
                    Name = "North Macedonia",
                    Capital = "Skopje",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Balkan country is home to Lake Ohrid.",
                    FlagUrl = "/images/countries/flags/north_macedonia.svg",
                    FactUrl = "/images/countries/hints/north_macedonia.jpg"
                },
                new Country
                {
                    Id = 30,
                    Name = "Norway",
                    Capital = "Oslo",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Nordic country is famous for fjords and a long Atlantic coastline.",
                    FlagUrl = "/images/countries/flags/norway.svg",
                    FactUrl = "/images/countries/hints/norway.jpg"
                },
                new Country
                {
                    Id = 31,
                    Name = "Poland",
                    Capital = "Warsaw",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Central European country is known for pierogi and the historic city of Kraków.",
                    FlagUrl = "/images/countries/flags/poland.svg",
                    FactUrl = "/images/countries/hints/poland.jpg"
                },
                new Country
                {
                    Id = 32,
                    Name = "Portugal",
                    Capital = "Lisbon",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Atlantic country is famous for port wine, azulejo tiles and fado.",
                    FlagUrl = "/images/countries/flags/portugal.svg",
                    FactUrl = "/images/countries/hints/portugal.jpg"
                },
                new Country
                {
                    Id = 33,
                    Name = "Romania",
                    Capital = "Bucharest",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This country is associated with Transylvania and the Carpathian Mountains.",
                    FlagUrl = "/images/countries/flags/romania.svg",
                    FactUrl = "/images/countries/hints/romania.jpg"
                },
                new Country
                {
                    Id = 34,
                    Name = "Russia",
                    Capital = "Moscow",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This transcontinental country is the largest country in the world.",
                    FlagUrl = "/images/countries/flags/russia.svg",
                    FactUrl = "/images/countries/hints/russia.jpg"
                },
                new Country
                {
                    Id = 35,
                    Name = "San Marino",
                    Capital = "San Marino",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This tiny republic is completely surrounded by Italy.",
                    FlagUrl = "/images/countries/flags/san_marino.svg",
                    FactUrl = "/images/countries/hints/san_marino.jpg"
                },
                new Country
                {
                    Id = 36,
                    Name = "Serbia",
                    Capital = "Belgrade",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Balkan country's capital sits where the Sava meets the Danube.",
                    FlagUrl = "/images/countries/flags/serbia.svg",
                    FactUrl = "/images/countries/hints/serbia.jpg"
                },
                new Country
                {
                    Id = 37,
                    Name = "Slovakia",
                    Capital = "Bratislava",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Central European country lies between Czechia, Poland, Ukraine, Hungary and Austria.",
                    FlagUrl = "/images/countries/flags/slovakia.svg",
                    FactUrl = "/images/countries/hints/slovakia.jpg"
                },
                new Country
                {
                    Id = 38,
                    Name = "Slovenia",
                    Capital = "Ljubljana",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small Alpine country is known for Lake Bled.",
                    FlagUrl = "/images/countries/flags/slovenia.svg",
                    FactUrl = "/images/countries/hints/slovenia.jpg"
                },
                new Country
                {
                    Id = 39,
                    Name = "Spain",
                    Capital = "Madrid",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for flamenco, paella and the Sagrada Família.",
                    FlagUrl = "/images/countries/flags/spain.svg",
                    FactUrl = "/images/countries/hints/spain.jpg"
                },
                new Country
                {
                    Id = 40,
                    Name = "Sweden",
                    Capital = "Stockholm",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Nordic country is known for IKEA, ABBA and thousands of islands.",
                    FlagUrl = "/images/countries/flags/sweden.svg",
                    FactUrl = "/images/countries/hints/sweden.jpg"
                },
                new Country
                {
                    Id = 41,
                    Name = "Switzerland",
                    Capital = "Bern",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Alpine country is famous for chocolate, watches and neutrality.",
                    FlagUrl = "/images/countries/flags/switzerland.svg",
                    FactUrl = "/images/countries/hints/switzerland.jpg"
                },
                new Country
                {
                    Id = 42,
                    Name = "Ukraine",
                    Capital = "Kyiv",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This large Eastern European country is known for vast sunflower fields and the Carpathians.",
                    FlagUrl = "/images/countries/flags/ukraine.svg",
                    FactUrl = "/images/countries/hints/ukraine.jpg"
                },
                new Country
                {
                    Id = 43,
                    Name = "United Kingdom",
                    Capital = "London",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This island state includes England, Scotland, Wales and Northern Ireland.",
                    FlagUrl = "/images/countries/flags/united_kingdom_of_great_britain_and_northern_ireland.svg",
                    FactUrl = "/images/countries/hints/united_kingdom_of_great_britain_and_northern_ireland.jpg"
                },
                new Country
                {
                    Id = 44,
                    Name = "Vatican City",
                    Capital = "Vatican City",
                    Continent = Continent.Europe,
                    Difficulty = Difficulty.Easy,
                    Fact = "This tiny independent state is the headquarters of the Roman Catholic Church.",
                    FlagUrl = "/images/countries/flags/vatican_city.svg",
                    FactUrl = "/images/countries/hints/vatican_city.jpg"
                },
                new Country
                {
                    Id = 45,
                    Name = "Afghanistan",
                    Capital = "Kabul",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This landlocked country lies at the crossroads of Central and South Asia.",
                    FlagUrl = "/images/countries/flags/afghanistan.svg",
                    FactUrl = "/images/countries/hints/afghanistan.jpg"
                },
                new Country
                {
                    Id = 46,
                    Name = "Armenia",
                    Capital = "Yerevan",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caucasus country is associated with Mount Ararat and an ancient Christian heritage.",
                    FlagUrl = "/images/countries/flags/armenia.svg",
                    FactUrl = "/images/countries/hints/armenia.jpg"
                },
                new Country
                {
                    Id = 47,
                    Name = "Azerbaijan",
                    Capital = "Baku",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caucasus country lies on the Caspian Sea and is known as the Land of Fire.",
                    FlagUrl = "/images/countries/flags/azerbaijan.svg",
                    FactUrl = "/images/countries/hints/azerbaijan.jpg"
                },
                new Country
                {
                    Id = 48,
                    Name = "Bahrain",
                    Capital = "Manama",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small island kingdom lies in the Persian Gulf.",
                    FlagUrl = "/images/countries/flags/bahrain.svg",
                    FactUrl = "/images/countries/hints/bahrain.jpg"
                },
                new Country
                {
                    Id = 49,
                    Name = "Bangladesh",
                    Capital = "Dhaka",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This densely populated South Asian country lies on the Ganges-Brahmaputra delta.",
                    FlagUrl = "/images/countries/flags/bangladesh.svg",
                    FactUrl = "/images/countries/hints/bangladesh.jpg"
                },
                new Country
                {
                    Id = 50,
                    Name = "Bhutan",
                    Capital = "Thimphu",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Himalayan kingdom is famous for measuring Gross National Happiness.",
                    FlagUrl = "/images/countries/flags/bhutan.svg",
                    FactUrl = "/images/countries/hints/bhutan.jpg"
                },
                new Country
                {
                    Id = 51,
                    Name = "Brunei",
                    Capital = "Bandar Seri Begawan",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small, oil-rich sultanate is located on the island of Borneo.",
                    FlagUrl = "/images/countries/flags/brunei.svg",
                    FactUrl = "/images/countries/hints/brunei.jpg"
                },
                new Country
                {
                    Id = 52,
                    Name = "Cambodia",
                    Capital = "Phnom Penh",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Southeast Asian country is home to Angkor Wat.",
                    FlagUrl = "/images/countries/flags/cambodia.svg",
                    FactUrl = "/images/countries/hints/cambodia.jpg"
                },
                new Country
                {
                    Id = 53,
                    Name = "China",
                    Capital = "Beijing",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is home to the Great Wall and has one of the world's largest populations.",
                    FlagUrl = "/images/countries/flags/china.svg",
                    FactUrl = "/images/countries/hints/china.jpg"
                },
                new Country
                {
                    Id = 54,
                    Name = "Cyprus",
                    Capital = "Nicosia",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Mediterranean island is geographically in Western Asia and culturally linked with Europe.",
                    FlagUrl = "/images/countries/flags/cyprus.svg",
                    FactUrl = "/images/countries/hints/cyprus.jpg"
                },
                new Country
                {
                    Id = 55,
                    Name = "Georgia",
                    Capital = "Tbilisi",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caucasus country is famous for an ancient wine-making tradition.",
                    FlagUrl = "/images/countries/flags/georgia.svg",
                    FactUrl = "/images/countries/hints/georgia.jpg"
                },
                new Country
                {
                    Id = 56,
                    Name = "India",
                    Capital = "New Delhi",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This South Asian country is home to the Taj Mahal.",
                    FlagUrl = "/images/countries/flags/india.svg",
                    FactUrl = "/images/countries/hints/india.jpg"
                },
                new Country
                {
                    Id = 57,
                    Name = "Indonesia",
                    Capital = "Jakarta",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This enormous archipelago includes Java, Sumatra and Bali.",
                    FlagUrl = "/images/countries/flags/indonesia.svg",
                    FactUrl = "/images/countries/hints/indonesia.jpg"
                },
                new Country
                {
                    Id = 58,
                    Name = "Iran",
                    Capital = "Tehran",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country was historically known as Persia.",
                    FlagUrl = "/images/countries/flags/iran.svg",
                    FactUrl = "/images/countries/hints/iran.jpg"
                },
                new Country
                {
                    Id = 59,
                    Name = "Iraq",
                    Capital = "Baghdad",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Middle Eastern country includes much of ancient Mesopotamia.",
                    FlagUrl = "/images/countries/flags/iraq.svg",
                    FactUrl = "/images/countries/hints/iraq.jpg"
                },
                new Country
                {
                    Id = 60,
                    Name = "Israel",
                    Capital = "Jerusalem",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Middle Eastern country lies on the eastern Mediterranean coast.",
                    FlagUrl = "/images/countries/flags/israel.svg",
                    FactUrl = "/images/countries/hints/israel.jpg"
                },
                new Country
                {
                    Id = 61,
                    Name = "Japan",
                    Capital = "Tokyo",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This island country is known for Mount Fuji, sushi and bullet trains.",
                    FlagUrl = "/images/countries/flags/japan.svg",
                    FactUrl = "/images/countries/hints/japan.jpg"
                },
                new Country
                {
                    Id = 62,
                    Name = "Jordan",
                    Capital = "Amman",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Middle Eastern country is home to the ancient city of Petra.",
                    FlagUrl = "/images/countries/flags/jordan.svg",
                    FactUrl = "/images/countries/hints/jordan.jpg"
                },
                new Country
                {
                    Id = 63,
                    Name = "Kazakhstan",
                    Capital = "Astana",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This vast Central Asian country is the world's largest landlocked country.",
                    FlagUrl = "/images/countries/flags/kazakhstan.svg",
                    FactUrl = "/images/countries/hints/kazakhstan.jpg"
                },
                new Country
                {
                    Id = 64,
                    Name = "Kuwait",
                    Capital = "Kuwait City",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This small Gulf state is known for major oil reserves.",
                    FlagUrl = "/images/countries/flags/kuwait.svg",
                    FactUrl = "/images/countries/hints/kuwait.jpg"
                },
                new Country
                {
                    Id = 65,
                    Name = "Kyrgyzstan",
                    Capital = "Bishkek",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This mountainous Central Asian country is known for nomadic traditions and Issyk-Kul Lake.",
                    FlagUrl = "/images/countries/flags/kyrgyzstan.svg",
                    FactUrl = "/images/countries/hints/kyrgyzstan.jpg"
                },
                new Country
                {
                    Id = 66,
                    Name = "Laos",
                    Capital = "Vientiane",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This landlocked Southeast Asian country is crossed by the Mekong River.",
                    FlagUrl = "/images/countries/flags/laos.svg",
                    FactUrl = "/images/countries/hints/laos.jpg"
                },
                new Country
                {
                    Id = 67,
                    Name = "Lebanon",
                    Capital = "Beirut",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Mediterranean country is famous for cedar trees and ancient Phoenician heritage.",
                    FlagUrl = "/images/countries/flags/lebanon.svg",
                    FactUrl = "/images/countries/hints/lebanon.jpg"
                },
                new Country
                {
                    Id = 68,
                    Name = "Malaysia",
                    Capital = "Kuala Lumpur",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Southeast Asian country is split between the Malay Peninsula and Borneo.",
                    FlagUrl = "/images/countries/flags/malaysia.svg",
                    FactUrl = "/images/countries/hints/malaysia.jpg"
                },
                new Country
                {
                    Id = 69,
                    Name = "Maldives",
                    Capital = "Malé",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Indian Ocean country consists of coral atolls and is famous for overwater resorts.",
                    FlagUrl = "/images/countries/flags/maldives.svg",
                    FactUrl = "/images/countries/hints/maldives.jpg"
                },
                new Country
                {
                    Id = 70,
                    Name = "Mongolia",
                    Capital = "Ulaanbaatar",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This vast landlocked country is associated with Genghis Khan and the Gobi Desert.",
                    FlagUrl = "/images/countries/flags/mongolia.svg",
                    FactUrl = "/images/countries/hints/mongolia.jpg"
                },
                new Country
                {
                    Id = 71,
                    Name = "Myanmar",
                    Capital = "Naypyidaw",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Southeast Asian country was formerly commonly known as Burma.",
                    FlagUrl = "/images/countries/flags/myanmar.svg",
                    FactUrl = "/images/countries/hints/myanmar.jpg"
                },
                new Country
                {
                    Id = 72,
                    Name = "Nepal",
                    Capital = "Kathmandu",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Himalayan country is home to Mount Everest.",
                    FlagUrl = "/images/countries/flags/nepal.svg",
                    FactUrl = "/images/countries/hints/nepal.jpg"
                },
                new Country
                {
                    Id = 73,
                    Name = "North Korea",
                    Capital = "Pyongyang",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This country occupies the northern half of the Korean Peninsula.",
                    FlagUrl = "/images/countries/flags/north_korea.svg",
                    FactUrl = "/images/countries/hints/north_korea.jpg"
                },
                new Country
                {
                    Id = 74,
                    Name = "Oman",
                    Capital = "Muscat",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Arabian Peninsula country has a long coastline on the Arabian Sea.",
                    FlagUrl = "/images/countries/flags/oman.svg",
                    FactUrl = "/images/countries/hints/oman.jpg"
                },
                new Country
                {
                    Id = 75,
                    Name = "Pakistan",
                    Capital = "Islamabad",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This South Asian country is home to K2, the world's second-highest mountain.",
                    FlagUrl = "/images/countries/flags/pakistan.svg",
                    FactUrl = "/images/countries/hints/pakistan.jpg"
                },
                new Country
                {
                    Id = 76,
                    Name = "Palestine",
                    Capital = "East Jerusalem",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This territory is located in the Levant and includes the West Bank and Gaza Strip.",
                    FlagUrl = "/images/countries/flags/palestine.svg",
                    FactUrl = "/images/countries/hints/palestine.jpg"
                },
                new Country
                {
                    Id = 77,
                    Name = "Philippines",
                    Capital = "Manila",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Southeast Asian country is an archipelago of more than 7,000 islands.",
                    FlagUrl = "/images/countries/flags/philippines.svg",
                    FactUrl = "/images/countries/hints/philippines.jpg"
                },
                new Country
                {
                    Id = 78,
                    Name = "Qatar",
                    Capital = "Doha",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This small Gulf state hosted the 2022 FIFA World Cup.",
                    FlagUrl = "/images/countries/flags/qatar.svg",
                    FactUrl = "/images/countries/hints/qatar.jpg"
                },
                new Country
                {
                    Id = 79,
                    Name = "Saudi Arabia",
                    Capital = "Riyadh",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Arabian Peninsula country is home to Mecca and Medina.",
                    FlagUrl = "/images/countries/flags/saudi_arabia.svg",
                    FactUrl = "/images/countries/hints/saudi_arabia.jpg"
                },
                new Country
                {
                    Id = 80,
                    Name = "Singapore",
                    Capital = "Singapore",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This city-state is one of the world's major financial and shipping hubs.",
                    FlagUrl = "/images/countries/flags/singapore.svg",
                    FactUrl = "/images/countries/hints/singapore.jpg"
                },
                new Country
                {
                    Id = 81,
                    Name = "South Korea",
                    Capital = "Seoul",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is known for K-pop, technology and kimchi.",
                    FlagUrl = "/images/countries/flags/south_korea.svg",
                    FactUrl = "/images/countries/hints/south_korea.jpg"
                },
                new Country
                {
                    Id = 82,
                    Name = "Sri Lanka",
                    Capital = "Sri Jayawardenepura Kotte",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This island country lies just south of India and is famous for tea.",
                    FlagUrl = "/images/countries/flags/sri_lanka.svg",
                    FactUrl = "/images/countries/hints/sri_lanka.jpg"
                },
                new Country
                {
                    Id = 83,
                    Name = "Syria",
                    Capital = "Damascus",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Middle Eastern country contains one of the world's oldest continuously inhabited cities.",
                    FlagUrl = "/images/countries/flags/syria.svg",
                    FactUrl = "/images/countries/hints/syria.jpg"
                },
                new Country
                {
                    Id = 84,
                    Name = "Tajikistan",
                    Capital = "Dushanbe",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This mountainous Central Asian country is dominated by the Pamir Mountains.",
                    FlagUrl = "/images/countries/flags/tajikistan.svg",
                    FactUrl = "/images/countries/hints/tajikistan.jpg"
                },
                new Country
                {
                    Id = 85,
                    Name = "Thailand",
                    Capital = "Bangkok",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Southeast Asian country is known for temples, tropical beaches and Thai cuisine.",
                    FlagUrl = "/images/countries/flags/thailand.svg",
                    FactUrl = "/images/countries/hints/thailand.jpg"
                },
                new Country
                {
                    Id = 86,
                    Name = "Timor-Leste",
                    Capital = "Dili",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This young Southeast Asian nation occupies the eastern half of Timor island.",
                    FlagUrl = "/images/countries/flags/timor_leste.svg",
                    FactUrl = "/images/countries/hints/timor_leste.jpg"
                },
                new Country
                {
                    Id = 87,
                    Name = "Türkiye",
                    Capital = "Ankara",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This transcontinental country spans both Europe and Asia and is home to Istanbul.",
                    FlagUrl = "/images/countries/flags/turkiye.svg",
                    FactUrl = "/images/countries/hints/turkiye.jpg"
                },
                new Country
                {
                    Id = 88,
                    Name = "Turkmenistan",
                    Capital = "Ashgabat",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Central Asian country is largely covered by the Karakum Desert.",
                    FlagUrl = "/images/countries/flags/turkmenistan.svg",
                    FactUrl = "/images/countries/hints/turkmenistan.jpg"
                },
                new Country
                {
                    Id = 89,
                    Name = "United Arab Emirates",
                    Capital = "Abu Dhabi",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Gulf federation includes Dubai and is known for modern skyscrapers.",
                    FlagUrl = "/images/countries/flags/united_arab_emirates.svg",
                    FactUrl = "/images/countries/hints/united_arab_emirates.jpg"
                },
                new Country
                {
                    Id = 90,
                    Name = "Uzbekistan",
                    Capital = "Tashkent",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Central Asian country is famous for Silk Road cities such as Samarkand.",
                    FlagUrl = "/images/countries/flags/uzbekistan.svg",
                    FactUrl = "/images/countries/hints/uzbekistan.jpg"
                },
                new Country
                {
                    Id = 91,
                    Name = "Vietnam",
                    Capital = "Hanoi",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Southeast Asian country has a long S-shaped coastline.",
                    FlagUrl = "/images/countries/flags/vietnam.svg",
                    FactUrl = "/images/countries/hints/vietnam.jpg"
                },
                new Country
                {
                    Id = 92,
                    Name = "Yemen",
                    Capital = "Sana'a",
                    Continent = Continent.Asia,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Arabian Peninsula country is home to the unique island of Socotra.",
                    FlagUrl = "/images/countries/flags/yemen.svg",
                    FactUrl = "/images/countries/hints/yemen.jpg"
                },
                new Country
                {
                    Id = 93,
                    Name = "Algeria",
                    Capital = "Algiers",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This North African country is the largest country in Africa by area.",
                    FlagUrl = "/images/countries/flags/algeria.svg",
                    FactUrl = "/images/countries/hints/algeria.jpg"
                },
                new Country
                {
                    Id = 94,
                    Name = "Angola",
                    Capital = "Luanda",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This southwest African country has a long Atlantic coastline and major oil resources.",
                    FlagUrl = "/images/countries/flags/angola.svg",
                    FactUrl = "/images/countries/hints/angola.jpg"
                },
                new Country
                {
                    Id = 95,
                    Name = "Benin",
                    Capital = "Porto-Novo",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This West African country is considered one of the historic centers of Vodun.",
                    FlagUrl = "/images/countries/flags/benin.svg",
                    FactUrl = "/images/countries/hints/benin.jpg"
                },
                new Country
                {
                    Id = 96,
                    Name = "Botswana",
                    Capital = "Gaborone",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This southern African country is known for the Okavango Delta.",
                    FlagUrl = "/images/countries/flags/botswana.svg",
                    FactUrl = "/images/countries/hints/botswana.jpg"
                },
                new Country
                {
                    Id = 97,
                    Name = "Burkina Faso",
                    Capital = "Ouagadougou",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This landlocked West African country is known for a major pan-African film festival.",
                    FlagUrl = "/images/countries/flags/burkina_faso.svg",
                    FactUrl = "/images/countries/hints/burkina_faso.jpg"
                },
                new Country
                {
                    Id = 98,
                    Name = "Burundi",
                    Capital = "Gitega",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small East African country lies near Lake Tanganyika.",
                    FlagUrl = "/images/countries/flags/burundi.svg",
                    FactUrl = "/images/countries/hints/burundi.jpg"
                },
                new Country
                {
                    Id = 99,
                    Name = "Cabo Verde",
                    Capital = "Praia",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This island country lies in the Atlantic Ocean west of Senegal.",
                    FlagUrl = "/images/countries/flags/cabo_verde.svg",
                    FactUrl = "/images/countries/hints/cabo_verde.jpg"
                },
                new Country
                {
                    Id = 100,
                    Name = "Cameroon",
                    Capital = "Yaoundé",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Central African country is sometimes called 'Africa in miniature' because of its geographic diversity.",
                    FlagUrl = "/images/countries/flags/cameroon.svg",
                    FactUrl = "/images/countries/hints/cameroon.jpg"
                },
                new Country
                {
                    Id = 101,
                    Name = "Central African Republic",
                    Capital = "Bangui",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This landlocked country lies near the geographic center of Africa.",
                    FlagUrl = "/images/countries/flags/central_african_republic.svg",
                    FactUrl = "/images/countries/hints/central_african_republic.jpg"
                },
                new Country
                {
                    Id = 102,
                    Name = "Chad",
                    Capital = "N'Djamena",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This landlocked country is named after Lake Chad.",
                    FlagUrl = "/images/countries/flags/chad.svg",
                    FactUrl = "/images/countries/hints/chad.jpg"
                },
                new Country
                {
                    Id = 103,
                    Name = "Comoros",
                    Capital = "Moroni",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This island nation lies in the Indian Ocean between Mozambique and Madagascar.",
                    FlagUrl = "/images/countries/flags/comoros.svg",
                    FactUrl = "/images/countries/hints/comoros.jpg"
                },
                new Country
                {
                    Id = 104,
                    Name = "Democratic Republic of the Congo",
                    Capital = "Kinshasa",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This huge Central African country contains much of the Congo rainforest.",
                    FlagUrl = "/images/countries/flags/dr_congo.svg",
                    FactUrl = "/images/countries/hints/dr_congo.jpg"
                },
                new Country
                {
                    Id = 105,
                    Name = "Republic of the Congo",
                    Capital = "Brazzaville",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Central African country's capital faces Kinshasa across the Congo River.",
                    FlagUrl = "/images/countries/flags/congo.svg",
                    FactUrl = "/images/countries/hints/congo.jpg"
                },
                new Country
                {
                    Id = 106,
                    Name = "Côte d'Ivoire",
                    Capital = "Yamoussoukro",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This West African country is one of the world's leading cocoa producers.",
                    FlagUrl = "/images/countries/flags/cote_d_ivoire.svg",
                    FactUrl = "/images/countries/hints/cote_d_ivoire.jpg"
                },
                new Country
                {
                    Id = 107,
                    Name = "Djibouti",
                    Capital = "Djibouti",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This small Horn of Africa country sits near one of the world's busiest shipping routes.",
                    FlagUrl = "/images/countries/flags/djibouti.svg",
                    FactUrl = "/images/countries/hints/djibouti.jpg"
                },
                new Country
                {
                    Id = 108,
                    Name = "Egypt",
                    Capital = "Cairo",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for the pyramids of Giza and the Nile River.",
                    FlagUrl = "/images/countries/flags/egypt.svg",
                    FactUrl = "/images/countries/hints/egypt.jpg"
                },
                new Country
                {
                    Id = 109,
                    Name = "Equatorial Guinea",
                    Capital = "Malabo",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small Central African country has both mainland and island territory.",
                    FlagUrl = "/images/countries/flags/equatorial_guinea.svg",
                    FactUrl = "/images/countries/hints/equatorial_guinea.jpg"
                },
                new Country
                {
                    Id = 110,
                    Name = "Eritrea",
                    Capital = "Asmara",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Horn of Africa country has a long Red Sea coastline.",
                    FlagUrl = "/images/countries/flags/eritrea.svg",
                    FactUrl = "/images/countries/hints/eritrea.jpg"
                },
                new Country
                {
                    Id = 111,
                    Name = "Eswatini",
                    Capital = "Mbabane",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small southern African kingdom is one of the world's remaining absolute monarchies.",
                    FlagUrl = "/images/countries/flags/eswatini.svg",
                    FactUrl = "/images/countries/hints/eswatini.jpg"
                },
                new Country
                {
                    Id = 112,
                    Name = "Ethiopia",
                    Capital = "Addis Ababa",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Horn of Africa country is associated with the origin of coffee.",
                    FlagUrl = "/images/countries/flags/ethiopia.svg",
                    FactUrl = "/images/countries/hints/ethiopia.jpg"
                },
                new Country
                {
                    Id = 113,
                    Name = "Gabon",
                    Capital = "Libreville",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This equatorial Central African country is heavily forested.",
                    FlagUrl = "/images/countries/flags/gabon.svg",
                    FactUrl = "/images/countries/hints/gabon.jpg"
                },
                new Country
                {
                    Id = 114,
                    Name = "Gambia",
                    Capital = "Banjul",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This narrow West African country follows the course of the Gambia River.",
                    FlagUrl = "/images/countries/flags/gambia.svg",
                    FactUrl = "/images/countries/hints/gambia.jpg"
                },
                new Country
                {
                    Id = 115,
                    Name = "Ghana",
                    Capital = "Accra",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This West African country was the first sub-Saharan African colony to gain independence in 1957.",
                    FlagUrl = "/images/countries/flags/ghana.svg",
                    FactUrl = "/images/countries/hints/ghana.jpg"
                },
                new Country
                {
                    Id = 116,
                    Name = "Guinea",
                    Capital = "Conakry",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This West African country has large bauxite reserves.",
                    FlagUrl = "/images/countries/flags/guinea.svg",
                    FactUrl = "/images/countries/hints/guinea.jpg"
                },
                new Country
                {
                    Id = 117,
                    Name = "Guinea-Bissau",
                    Capital = "Bissau",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small West African country includes the Bijagós Islands.",
                    FlagUrl = "/images/countries/flags/guinea-bissau.svg",
                    FactUrl = "/images/countries/hints/guinea-bissau.jpg"
                },
                new Country
                {
                    Id = 118,
                    Name = "Kenya",
                    Capital = "Nairobi",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Easy,
                    Fact = "This East African country is famous for safari wildlife and the Great Rift Valley.",
                    FlagUrl = "/images/countries/flags/kenya.svg",
                    FactUrl = "/images/countries/hints/kenya.jpg"
                },
                new Country
                {
                    Id = 119,
                    Name = "Lesotho",
                    Capital = "Maseru",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This mountain kingdom is completely surrounded by South Africa.",
                    FlagUrl = "/images/countries/flags/lesotho.svg",
                    FactUrl = "/images/countries/hints/lesotho.jpg"
                },
                new Country
                {
                    Id = 120,
                    Name = "Liberia",
                    Capital = "Monrovia",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This West African country was founded in the 19th century by formerly enslaved people from the United States.",
                    FlagUrl = "/images/countries/flags/liberia.svg",
                    FactUrl = "/images/countries/hints/liberia.jpg"
                },
                new Country
                {
                    Id = 121,
                    Name = "Libya",
                    Capital = "Tripoli",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Easy,
                    Fact = "This North African country is largely covered by the Sahara Desert.",
                    FlagUrl = "/images/countries/flags/libya.svg",
                    FactUrl = "/images/countries/hints/libya.jpg"
                },
                new Country
                {
                    Id = 122,
                    Name = "Madagascar",
                    Capital = "Antananarivo",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This large island is famous for unique wildlife such as lemurs.",
                    FlagUrl = "/images/countries/flags/madagascar.svg",
                    FactUrl = "/images/countries/hints/madagascar.jpg"
                },
                new Country
                {
                    Id = 123,
                    Name = "Malawi",
                    Capital = "Lilongwe",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This southeastern African country is dominated by a large lake of the same name.",
                    FlagUrl = "/images/countries/flags/malawi.svg",
                    FactUrl = "/images/countries/hints/malawi.jpg"
                },
                new Country
                {
                    Id = 124,
                    Name = "Mali",
                    Capital = "Bamako",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This West African country is home to the historic city of Timbuktu.",
                    FlagUrl = "/images/countries/flags/mali.svg",
                    FactUrl = "/images/countries/hints/mali.jpg"
                },
                new Country
                {
                    Id = 125,
                    Name = "Mauritania",
                    Capital = "Nouakchott",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "Much of this West African country lies within the Sahara Desert.",
                    FlagUrl = "/images/countries/flags/mauritania.svg",
                    FactUrl = "/images/countries/hints/mauritania.jpg"
                },
                new Country
                {
                    Id = 126,
                    Name = "Mauritius",
                    Capital = "Port Louis",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Indian Ocean island nation is famous for beaches and was once home to the dodo.",
                    FlagUrl = "/images/countries/flags/mauritius.svg",
                    FactUrl = "/images/countries/hints/mauritius.jpg"
                },
                new Country
                {
                    Id = 127,
                    Name = "Morocco",
                    Capital = "Rabat",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Easy,
                    Fact = "This North African country is known for Marrakech, souks and the Atlas Mountains.",
                    FlagUrl = "/images/countries/flags/morocco.svg",
                    FactUrl = "/images/countries/hints/morocco.jpg"
                },
                new Country
                {
                    Id = 128,
                    Name = "Mozambique",
                    Capital = "Maputo",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This southeast African country has a long Indian Ocean coastline.",
                    FlagUrl = "/images/countries/flags/mozambique.svg",
                    FactUrl = "/images/countries/hints/mozambique.jpg"
                },
                new Country
                {
                    Id = 129,
                    Name = "Namibia",
                    Capital = "Windhoek",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This southern African country is home to the Namib Desert and giant sand dunes.",
                    FlagUrl = "/images/countries/flags/namibia.svg",
                    FactUrl = "/images/countries/hints/namibia.jpg"
                },
                new Country
                {
                    Id = 130,
                    Name = "Niger",
                    Capital = "Niamey",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This large landlocked West African country is mostly covered by the Sahara.",
                    FlagUrl = "/images/countries/flags/niger.svg",
                    FactUrl = "/images/countries/hints/niger.jpg"
                },
                new Country
                {
                    Id = 131,
                    Name = "Nigeria",
                    Capital = "Abuja",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This West African country has Africa's largest population.",
                    FlagUrl = "/images/countries/flags/nigeria.svg",
                    FactUrl = "/images/countries/hints/nigeria.jpg"
                },
                new Country
                {
                    Id = 132,
                    Name = "Rwanda",
                    Capital = "Kigali",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This small East African country is known as the 'Land of a Thousand Hills'.",
                    FlagUrl = "/images/countries/flags/rwanda.svg",
                    FactUrl = "/images/countries/hints/rwanda.jpg"
                },
                new Country
                {
                    Id = 133,
                    Name = "São Tomé and Príncipe",
                    Capital = "São Tomé",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This island nation lies in the Gulf of Guinea near the equator.",
                    FlagUrl = "/images/countries/flags/sao_tome_and_principe.svg",
                    FactUrl = "/images/countries/hints/sao_tome_and_principe.jpg"
                },
                new Country
                {
                    Id = 134,
                    Name = "Senegal",
                    Capital = "Dakar",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This West African country's capital sits on the Cap-Vert peninsula.",
                    FlagUrl = "/images/countries/flags/senegal.svg",
                    FactUrl = "/images/countries/hints/senegal.jpg"
                },
                new Country
                {
                    Id = 135,
                    Name = "Seychelles",
                    Capital = "Victoria",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Indian Ocean island nation is famous for granite beaches and giant tortoises.",
                    FlagUrl = "/images/countries/flags/seychelles.svg",
                    FactUrl = "/images/countries/hints/seychelles.jpg"
                },
                new Country
                {
                    Id = 136,
                    Name = "Sierra Leone",
                    Capital = "Freetown",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This West African country's capital was founded as a settlement for freed slaves.",
                    FlagUrl = "/images/countries/flags/sierra_leone.svg",
                    FactUrl = "/images/countries/hints/sierra_leone.jpg"
                },
                new Country
                {
                    Id = 137,
                    Name = "Somalia",
                    Capital = "Mogadishu",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Horn of Africa country has the longest mainland coastline in Africa.",
                    FlagUrl = "/images/countries/flags/somalia.svg",
                    FactUrl = "/images/countries/hints/somalia.jpg"
                },
                new Country
                {
                    Id = 138,
                    Name = "South Africa",
                    Capital = "Pretoria",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This southern African country is famous for wildlife, Table Mountain and having multiple capitals.",
                    FlagUrl = "/images/countries/flags/south_africa.svg",
                    FactUrl = "/images/countries/hints/south_africa.jpg"
                },
                new Country
                {
                    Id = 139,
                    Name = "South Sudan",
                    Capital = "Juba",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This country became independent in 2011, making it the world's newest widely recognized state.",
                    FlagUrl = "/images/countries/flags/south_sudan.svg",
                    FactUrl = "/images/countries/hints/south_sudan.jpg"
                },
                new Country
                {
                    Id = 140,
                    Name = "Sudan",
                    Capital = "Khartoum",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This northeast African country lies where the Blue and White Nile meet.",
                    FlagUrl = "/images/countries/flags/sudan.svg",
                    FactUrl = "/images/countries/hints/sudan.jpg"
                },
                new Country
                {
                    Id = 141,
                    Name = "Tanzania",
                    Capital = "Dodoma",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This East African country is home to Mount Kilimanjaro and the Serengeti.",
                    FlagUrl = "/images/countries/flags/tanzania.svg",
                    FactUrl = "/images/countries/hints/tanzania.jpg"
                },
                new Country
                {
                    Id = 142,
                    Name = "Togo",
                    Capital = "Lomé",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Hard,
                    Fact = "This narrow West African country stretches from the Gulf of Guinea northward.",
                    FlagUrl = "/images/countries/flags/togo.svg",
                    FactUrl = "/images/countries/hints/togo.jpg"
                },
                new Country
                {
                    Id = 143,
                    Name = "Tunisia",
                    Capital = "Tunis",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Easy,
                    Fact = "This North African country contains the ruins of ancient Carthage.",
                    FlagUrl = "/images/countries/flags/tunisia.svg",
                    FactUrl = "/images/countries/hints/tunisia.jpg"
                },
                new Country
                {
                    Id = 144,
                    Name = "Uganda",
                    Capital = "Kampala",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This East African country lies on the shores of Lake Victoria.",
                    FlagUrl = "/images/countries/flags/uganda.svg",
                    FactUrl = "/images/countries/hints/uganda.jpg"
                },
                new Country
                {
                    Id = 145,
                    Name = "Zambia",
                    Capital = "Lusaka",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This southern African country shares Victoria Falls with Zimbabwe.",
                    FlagUrl = "/images/countries/flags/zambia.svg",
                    FactUrl = "/images/countries/hints/zambia.jpg"
                },
                new Country
                {
                    Id = 146,
                    Name = "Zimbabwe",
                    Capital = "Harare",
                    Continent = Continent.Africa,
                    Difficulty = Difficulty.Medium,
                    Fact = "This southern African country is known for Great Zimbabwe and Victoria Falls.",
                    FlagUrl = "/images/countries/flags/zimbabwe.svg",
                    FactUrl = "/images/countries/hints/zimbabwe.jpg"
                },
                new Country
                {
                    Id = 147,
                    Name = "Antigua and Barbuda",
                    Capital = "Saint John's",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Caribbean nation consists mainly of two islands and is famous for beaches.",
                    FlagUrl = "/images/countries/flags/antigua_and_barbuda.svg",
                    FactUrl = "/images/countries/hints/antigua_and_barbuda.jpg"
                },
                new Country
                {
                    Id = 148,
                    Name = "Bahamas",
                    Capital = "Nassau",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Atlantic archipelago consists of hundreds of islands and cays.",
                    FlagUrl = "/images/countries/flags/bahamas.svg",
                    FactUrl = "/images/countries/hints/bahamas.jpg"
                },
                new Country
                {
                    Id = 149,
                    Name = "Barbados",
                    Capital = "Bridgetown",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caribbean island is the birthplace of singer Rihanna.",
                    FlagUrl = "/images/countries/flags/barbados.svg",
                    FactUrl = "/images/countries/hints/barbados.jpg"
                },
                new Country
                {
                    Id = 150,
                    Name = "Belize",
                    Capital = "Belmopan",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Central American country has English as its official language.",
                    FlagUrl = "/images/countries/flags/belize.svg",
                    FactUrl = "/images/countries/hints/belize.jpg"
                },
                new Country
                {
                    Id = 151,
                    Name = "Canada",
                    Capital = "Ottawa",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for maple syrup, hockey and vast wilderness.",
                    FlagUrl = "/images/countries/flags/canada.svg",
                    FactUrl = "/images/countries/hints/canada.jpg"
                },
                new Country
                {
                    Id = 152,
                    Name = "Costa Rica",
                    Capital = "San José",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Central American country is famous for biodiversity and has no standing army.",
                    FlagUrl = "/images/countries/flags/costa_rica.svg",
                    FactUrl = "/images/countries/hints/costa_rica.jpg"
                },
                new Country
                {
                    Id = 153,
                    Name = "Cuba",
                    Capital = "Havana",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Caribbean island is known for classic cars, cigars and salsa music.",
                    FlagUrl = "/images/countries/flags/cuba.svg",
                    FactUrl = "/images/countries/hints/cuba.jpg"
                },
                new Country
                {
                    Id = 154,
                    Name = "Dominica",
                    Capital = "Roseau",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This mountainous Caribbean island is known as the 'Nature Island'.",
                    FlagUrl = "/images/countries/flags/dominica.svg",
                    FactUrl = "/images/countries/hints/dominica.jpg"
                },
                new Country
                {
                    Id = 155,
                    Name = "Dominican Republic",
                    Capital = "Santo Domingo",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caribbean country shares the island of Hispaniola with Haiti.",
                    FlagUrl = "/images/countries/flags/dominican_republic.svg",
                    FactUrl = "/images/countries/hints/dominican_republic.jpg"
                },
                new Country
                {
                    Id = 156,
                    Name = "El Salvador",
                    Capital = "San Salvador",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This is the smallest country in mainland Central America.",
                    FlagUrl = "/images/countries/flags/el_salvador.svg",
                    FactUrl = "/images/countries/hints/el_salvador.jpg"
                },
                new Country
                {
                    Id = 157,
                    Name = "Grenada",
                    Capital = "Saint George's",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Caribbean island nation is known as the 'Spice Isle'.",
                    FlagUrl = "/images/countries/flags/grenada.svg",
                    FactUrl = "/images/countries/hints/grenada.jpg"
                },
                new Country
                {
                    Id = 158,
                    Name = "Guatemala",
                    Capital = "Guatemala City",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Central American country is famous for Maya heritage and volcanoes.",
                    FlagUrl = "/images/countries/flags/guatemala.svg",
                    FactUrl = "/images/countries/hints/guatemala.jpg"
                },
                new Country
                {
                    Id = 159,
                    Name = "Haiti",
                    Capital = "Port-au-Prince",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caribbean country shares the island of Hispaniola with the Dominican Republic.",
                    FlagUrl = "/images/countries/flags/haiti.svg",
                    FactUrl = "/images/countries/hints/haiti.jpg"
                },
                new Country
                {
                    Id = 160,
                    Name = "Honduras",
                    Capital = "Tegucigalpa",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Central American country is home to the Maya ruins of Copán.",
                    FlagUrl = "/images/countries/flags/honduras.svg",
                    FactUrl = "/images/countries/hints/honduras.jpg"
                },
                new Country
                {
                    Id = 161,
                    Name = "Jamaica",
                    Capital = "Kingston",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This Caribbean island is strongly associated with reggae and Bob Marley.",
                    FlagUrl = "/images/countries/flags/jamaica.svg",
                    FactUrl = "/images/countries/hints/jamaica.jpg"
                },
                new Country
                {
                    Id = 162,
                    Name = "Mexico",
                    Capital = "Mexico City",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is known for tacos, ancient Maya and Aztec sites, and Día de los Muertos.",
                    FlagUrl = "/images/countries/flags/mexico.svg",
                    FactUrl = "/images/countries/hints/mexico.jpg"
                },
                new Country
                {
                    Id = 163,
                    Name = "Nicaragua",
                    Capital = "Managua",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Central American country is known for large lakes and volcanoes.",
                    FlagUrl = "/images/countries/flags/nicaragua.svg",
                    FactUrl = "/images/countries/hints/nicaragua.jpg"
                },
                new Country
                {
                    Id = 164,
                    Name = "Panama",
                    Capital = "Panama City",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for a canal connecting the Atlantic and Pacific Oceans.",
                    FlagUrl = "/images/countries/flags/panama.svg",
                    FactUrl = "/images/countries/hints/panama.jpg"
                },
                new Country
                {
                    Id = 165,
                    Name = "Saint Kitts and Nevis",
                    Capital = "Basseterre",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This tiny Caribbean federation consists of two main islands.",
                    FlagUrl = "/images/countries/flags/saint_kitts_and_nevis.svg",
                    FactUrl = "/images/countries/hints/saint_kitts_and_nevis.jpg"
                },
                new Country
                {
                    Id = 166,
                    Name = "Saint Lucia",
                    Capital = "Castries",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Caribbean island is famous for the twin volcanic peaks called the Pitons.",
                    FlagUrl = "/images/countries/flags/saint_lucia.svg",
                    FactUrl = "/images/countries/hints/saint_lucia.jpg"
                },
                new Country
                {
                    Id = 167,
                    Name = "Saint Vincent and the Grenadines",
                    Capital = "Kingstown",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Caribbean state includes Saint Vincent and a chain of smaller Grenadine islands.",
                    FlagUrl = "/images/countries/flags/saint_vincent_and_the_grenadines.svg",
                    FactUrl = "/images/countries/hints/saint_vincent_and_the_grenadines.jpg"
                },
                new Country
                {
                    Id = 168,
                    Name = "Trinidad and Tobago",
                    Capital = "Port of Spain",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Caribbean nation consists of two main islands and is famous for Carnival.",
                    FlagUrl = "/images/countries/flags/trinidad_and_tobago.svg",
                    FactUrl = "/images/countries/hints/trinidad_and_tobago.jpg"
                },
                new Country
                {
                    Id = 169,
                    Name = "United States",
                    Capital = "Washington, D.C.",
                    Continent = Continent.NorthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is home to landmarks such as the Statue of Liberty and the Grand Canyon.",
                    FlagUrl = "/images/countries/flags/united_states_of_america.svg",
                    FactUrl = "/images/countries/hints/united_states_of_america.jpg"
                },
                new Country
                {
                    Id = 170,
                    Name = "Argentina",
                    Capital = "Buenos Aires",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for tango, beef and Patagonia.",
                    FlagUrl = "/images/countries/flags/argentina.svg",
                    FactUrl = "/images/countries/hints/argentina.jpg"
                },
                new Country
                {
                    Id = 171,
                    Name = "Bolivia",
                    Capital = "Sucre",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This landlocked country contains Salar de Uyuni, the world's largest salt flat.",
                    FlagUrl = "/images/countries/flags/bolivia.svg",
                    FactUrl = "/images/countries/hints/bolivia.jpg"
                },
                new Country
                {
                    Id = 172,
                    Name = "Brazil",
                    Capital = "Brasília",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This is South America's largest country and home to much of the Amazon rainforest.",
                    FlagUrl = "/images/countries/flags/brazil.svg",
                    FactUrl = "/images/countries/hints/brazil.jpg"
                },
                new Country
                {
                    Id = 173,
                    Name = "Chile",
                    Capital = "Santiago",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This long, narrow country stretches along South America's Pacific coast.",
                    FlagUrl = "/images/countries/flags/chile.svg",
                    FactUrl = "/images/countries/hints/chile.jpg"
                },
                new Country
                {
                    Id = 174,
                    Name = "Colombia",
                    Capital = "Bogotá",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for coffee and has coastlines on both the Caribbean and Pacific.",
                    FlagUrl = "/images/countries/flags/colombia.svg",
                    FactUrl = "/images/countries/hints/colombia.jpg"
                },
                new Country
                {
                    Id = 175,
                    Name = "Ecuador",
                    Capital = "Quito",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This country is named after the equator and includes the Galápagos Islands.",
                    FlagUrl = "/images/countries/flags/ecuador.svg",
                    FactUrl = "/images/countries/hints/ecuador.jpg"
                },
                new Country
                {
                    Id = 176,
                    Name = "Guyana",
                    Capital = "Georgetown",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This South American country has English as its official language.",
                    FlagUrl = "/images/countries/flags/guyana.svg",
                    FactUrl = "/images/countries/hints/guyana.jpg"
                },
                new Country
                {
                    Id = 177,
                    Name = "Paraguay",
                    Capital = "Asunción",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This landlocked country lies between Argentina, Brazil and Bolivia.",
                    FlagUrl = "/images/countries/flags/paraguay.svg",
                    FactUrl = "/images/countries/hints/paraguay.jpg"
                },
                new Country
                {
                    Id = 178,
                    Name = "Peru",
                    Capital = "Lima",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is home to Machu Picchu and part of the Andes Mountains.",
                    FlagUrl = "/images/countries/flags/peru.svg",
                    FactUrl = "/images/countries/hints/peru.jpg"
                },
                new Country
                {
                    Id = 179,
                    Name = "Suriname",
                    Capital = "Paramaribo",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Hard,
                    Fact = "This small South American country has Dutch as its official language.",
                    FlagUrl = "/images/countries/flags/suriname.svg",
                    FactUrl = "/images/countries/hints/suriname.jpg"
                },
                new Country
                {
                    Id = 180,
                    Name = "Uruguay",
                    Capital = "Montevideo",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Medium,
                    Fact = "This small country lies between Argentina and Brazil on the Atlantic coast.",
                    FlagUrl = "/images/countries/flags/uruguay.svg",
                    FactUrl = "/images/countries/hints/uruguay.jpg"
                },
                new Country
                {
                    Id = 181,
                    Name = "Venezuela",
                    Capital = "Caracas",
                    Continent = Continent.SouthAmerica,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is home to Angel Falls, the world's highest uninterrupted waterfall.",
                    FlagUrl = "/images/countries/flags/venezuela.svg",
                    FactUrl = "/images/countries/hints/venezuela.jpg"
                },
                new Country
                {
                    Id = 182,
                    Name = "Australia",
                    Capital = "Canberra",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Easy,
                    Fact = "This country is famous for kangaroos, the Great Barrier Reef and the Outback.",
                    FlagUrl = "/images/countries/flags/australia.svg",
                    FactUrl = "/images/countries/hints/australia.jpg"
                },
                new Country
                {
                    Id = 183,
                    Name = "Fiji",
                    Capital = "Suva",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Pacific island nation consists of more than 300 islands.",
                    FlagUrl = "/images/countries/flags/fiji.svg",
                    FactUrl = "/images/countries/hints/fiji.jpg"
                },
                new Country
                {
                    Id = 184,
                    Name = "Kiribati",
                    Capital = "South Tarawa",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Pacific country spans all four hemispheres and consists mainly of low-lying atolls.",
                    FlagUrl = "/images/countries/flags/kiribati.svg",
                    FactUrl = "/images/countries/hints/kiribati.jpg"
                },
                new Country
                {
                    Id = 185,
                    Name = "Marshall Islands",
                    Capital = "Majuro",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Pacific island country includes Bikini Atoll.",
                    FlagUrl = "/images/countries/flags/marshall_islands.svg",
                    FactUrl = "/images/countries/hints/marshall_islands.jpg"
                },
                new Country
                {
                    Id = 186,
                    Name = "Micronesia",
                    Capital = "Palikir",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Pacific federation consists of four states spread across many islands.",
                    FlagUrl = "/images/countries/flags/micronesia.svg",
                    FactUrl = "/images/countries/hints/micronesia.jpg"
                },
                new Country
                {
                    Id = 187,
                    Name = "Nauru",
                    Capital = "Yaren",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This tiny Pacific island country became wealthy from phosphate mining.",
                    FlagUrl = "/images/countries/flags/nauru.svg",
                    FactUrl = "/images/countries/hints/nauru.jpg"
                },
                new Country
                {
                    Id = 188,
                    Name = "New Zealand",
                    Capital = "Wellington",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Easy,
                    Fact = "This island country is known for Māori culture and dramatic landscapes featured in The Lord of the Rings.",
                    FlagUrl = "/images/countries/flags/new_zealand.svg",
                    FactUrl = "/images/countries/hints/new_zealand.jpg"
                },
                new Country
                {
                    Id = 189,
                    Name = "Palau",
                    Capital = "Ngerulmud",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Pacific island country is famous for its Rock Islands and marine biodiversity.",
                    FlagUrl = "/images/countries/flags/palau.svg",
                    FactUrl = "/images/countries/hints/palau.jpg"
                },
                new Country
                {
                    Id = 190,
                    Name = "Papua New Guinea",
                    Capital = "Port Moresby",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Medium,
                    Fact = "This country is one of the world's most linguistically diverse.",
                    FlagUrl = "/images/countries/flags/papua_new_guinea.svg",
                    FactUrl = "/images/countries/hints/papua_new_guinea.jpg"
                },
                new Country
                {
                    Id = 191,
                    Name = "Samoa",
                    Capital = "Apia",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Medium,
                    Fact = "This Polynesian island nation lies in the South Pacific.",
                    FlagUrl = "/images/countries/flags/samoa.svg",
                    FactUrl = "/images/countries/hints/samoa.jpg"
                },
                new Country
                {
                    Id = 192,
                    Name = "Solomon Islands",
                    Capital = "Honiara",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Melanesian island country was the site of major battles during World War II.",
                    FlagUrl = "/images/countries/flags/solomon_islands.svg",
                    FactUrl = "/images/countries/hints/solomon_islands.jpg"
                },
                new Country
                {
                    Id = 193,
                    Name = "Tonga",
                    Capital = "Nukuʻalofa",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Polynesian kingdom is one of the few Pacific nations never formally colonized.",
                    FlagUrl = "/images/countries/flags/tonga.svg",
                    FactUrl = "/images/countries/hints/tonga.jpg"
                },
                new Country
                {
                    Id = 194,
                    Name = "Tuvalu",
                    Capital = "Funafuti",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This tiny Pacific nation consists of low-lying coral islands and atolls.",
                    FlagUrl = "/images/countries/flags/tuvalu.svg",
                    FactUrl = "/images/countries/hints/tuvalu.jpg"
                },
                new Country
                {
                    Id = 195,
                    Name = "Vanuatu",
                    Capital = "Port Vila",
                    Continent = Continent.Oceania,
                    Difficulty = Difficulty.Hard,
                    Fact = "This Pacific island nation is known for active volcanoes and traditional kastom culture.",
                    FlagUrl = "/images/countries/flags/vanuatu.svg",
                    FactUrl = "/images/countries/hints/vanuatu.jpg"
                }
            );
        }
    }
}
