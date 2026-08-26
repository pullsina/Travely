using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Travely.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedCountries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Capital", "Continent", "Difficulty", "Fact", "FactUrl", "FlagUrl", "Name" },
                values: new object[,]
                {
                    { 1, "Tirana", 0, 1, "This Balkan country is known for its Adriatic and Ionian coastline.", "/images/countries/hints/albania.jpg", "/images/countries/flags/albania.svg", "Albania" },
                    { 2, "Andorra la Vella", 0, 1, "This tiny country lies in the Pyrenees between France and Spain.", "/images/countries/hints/andorra.jpg", "/images/countries/flags/andorra.svg", "Andorra" },
                    { 3, "Vienna", 0, 0, "This country is famous for classical music, the Alps and schnitzel.", "/images/countries/hints/austria.jpg", "/images/countries/flags/austria.svg", "Austria" },
                    { 4, "Minsk", 0, 1, "This landlocked Eastern European country borders Poland, Lithuania, Latvia, Russia and Ukraine.", "/images/countries/hints/belarus.jpg", "/images/countries/flags/belarus.svg", "Belarus" },
                    { 5, "Brussels", 0, 0, "This country is famous for waffles, chocolate and being home to many EU institutions.", "/images/countries/hints/belgium.jpg", "/images/countries/flags/belgium.svg", "Belgium" },
                    { 6, "Sarajevo", 0, 1, "This Balkan country is known for Mostar's famous old bridge.", "/images/countries/hints/bosnia_and_herzegovina.jpg", "/images/countries/flags/bosnia_and_herzegovina.svg", "Bosnia and Herzegovina" },
                    { 7, "Sofia", 0, 1, "This Balkan country is known for rose oil and its Black Sea coast.", "/images/countries/hints/bulgaria.jpg", "/images/countries/flags/bulgaria.svg", "Bulgaria" },
                    { 8, "Zagreb", 0, 1, "This Adriatic country is famous for Dubrovnik and its many islands.", "/images/countries/hints/croatia.jpg", "/images/countries/flags/croatia.svg", "Croatia" },
                    { 9, "Prague", 0, 0, "This Central European country is famous for Prague Castle and its brewing tradition.", "/images/countries/hints/czechia.jpg", "/images/countries/flags/czechia.svg", "Czechia" },
                    { 10, "Copenhagen", 0, 0, "This Nordic country is known for LEGO, bicycles and hygge.", "/images/countries/hints/denmark.jpg", "/images/countries/flags/denmark.svg", "Denmark" },
                    { 11, "Tallinn", 0, 1, "This Baltic country is known for its digital society and medieval old town.", "/images/countries/hints/estonia.jpg", "/images/countries/flags/estonia.svg", "Estonia" },
                    { 12, "Helsinki", 0, 0, "This Nordic country is famous for saunas, lakes and the northern lights.", "/images/countries/hints/finland.jpg", "/images/countries/flags/finland.svg", "Finland" },
                    { 13, "Paris", 0, 0, "This country is famous for croissants, baguettes and the Eiffel Tower.", "/images/countries/hints/france.jpg", "/images/countries/flags/france.svg", "France" },
                    { 14, "Berlin", 0, 0, "This country is known for the Brandenburg Gate, autobahns and Oktoberfest.", "/images/countries/hints/germany.jpg", "/images/countries/flags/germany.svg", "Germany" },
                    { 15, "Athens", 0, 0, "This Mediterranean country is famous for ancient temples and thousands of islands.", "/images/countries/hints/greece.jpg", "/images/countries/flags/greece.svg", "Greece" },
                    { 16, "Budapest", 0, 0, "The Danube divides this country's capital into historic Buda and Pest.", "/images/countries/hints/hungary.jpg", "/images/countries/flags/hungary.svg", "Hungary" },
                    { 17, "Reykjavík", 0, 0, "This Nordic island country is famous for volcanoes, geysers and hot springs.", "/images/countries/hints/iceland.jpg", "/images/countries/flags/iceland.svg", "Iceland" },
                    { 18, "Dublin", 0, 0, "This island country is associated with shamrocks, Guinness and green landscapes.", "/images/countries/hints/ireland.jpg", "/images/countries/flags/ireland.svg", "Ireland" },
                    { 19, "Rome", 0, 0, "This country is famous for pizza, pasta and the Colosseum.", "/images/countries/hints/italy.jpg", "/images/countries/flags/italy.svg", "Italy" },
                    { 20, "Riga", 0, 1, "This Baltic country has a long coastline on the Baltic Sea.", "/images/countries/hints/latvia.jpg", "/images/countries/flags/latvia.svg", "Latvia" },
                    { 21, "Vaduz", 0, 2, "This tiny Alpine principality lies between Switzerland and Austria.", "/images/countries/hints/liechtenstein.jpg", "/images/countries/flags/liechtenstein.svg", "Liechtenstein" },
                    { 22, "Vilnius", 0, 1, "This Baltic country is the southernmost of the three Baltic states.", "/images/countries/hints/lithuania.jpg", "/images/countries/flags/lithuania.svg", "Lithuania" },
                    { 23, "Luxembourg", 0, 1, "This small country is one of the world's only remaining grand duchies.", "/images/countries/hints/luxembourg.jpg", "/images/countries/flags/luxembourg.svg", "Luxembourg" },
                    { 24, "Valletta", 0, 1, "This small Mediterranean island country lies south of Sicily.", "/images/countries/hints/malta.jpg", "/images/countries/flags/malta.svg", "Malta" },
                    { 25, "Chișinău", 0, 2, "This landlocked Eastern European country is well known for its wine cellars.", "/images/countries/hints/moldova.jpg", "/images/countries/flags/moldova.svg", "Moldova" },
                    { 26, "Monaco", 0, 1, "This tiny Mediterranean state is famous for Monte Carlo and Formula 1.", "/images/countries/hints/monaco.jpg", "/images/countries/flags/monaco.svg", "Monaco" },
                    { 27, "Podgorica", 0, 2, "This small Balkan country has a dramatic Adriatic coastline and the Bay of Kotor.", "/images/countries/hints/montenegro.jpg", "/images/countries/flags/montenegro.svg", "Montenegro" },
                    { 28, "Amsterdam", 0, 0, "This country is famous for canals, tulips, windmills and bicycles.", "/images/countries/hints/netherlands.jpg", "/images/countries/flags/netherlands.svg", "Netherlands" },
                    { 29, "Skopje", 0, 2, "This Balkan country is home to Lake Ohrid.", "/images/countries/hints/north_macedonia.jpg", "/images/countries/flags/north_macedonia.svg", "North Macedonia" },
                    { 30, "Oslo", 0, 0, "This Nordic country is famous for fjords and a long Atlantic coastline.", "/images/countries/hints/norway.jpg", "/images/countries/flags/norway.svg", "Norway" },
                    { 31, "Warsaw", 0, 0, "This Central European country is known for pierogi and the historic city of Kraków.", "/images/countries/hints/poland.jpg", "/images/countries/flags/poland.svg", "Poland" },
                    { 32, "Lisbon", 0, 0, "This Atlantic country is famous for port wine, azulejo tiles and fado.", "/images/countries/hints/portugal.jpg", "/images/countries/flags/portugal.svg", "Portugal" },
                    { 33, "Bucharest", 0, 1, "This country is associated with Transylvania and the Carpathian Mountains.", "/images/countries/hints/romania.jpg", "/images/countries/flags/romania.svg", "Romania" },
                    { 34, "Moscow", 0, 0, "This transcontinental country is the largest country in the world.", "/images/countries/hints/russia.jpg", "/images/countries/flags/russia.svg", "Russia" },
                    { 35, "San Marino", 0, 1, "This tiny republic is completely surrounded by Italy.", "/images/countries/hints/san_marino.jpg", "/images/countries/flags/san_marino.svg", "San Marino" },
                    { 36, "Belgrade", 0, 1, "This Balkan country's capital sits where the Sava meets the Danube.", "/images/countries/hints/serbia.jpg", "/images/countries/flags/serbia.svg", "Serbia" },
                    { 37, "Bratislava", 0, 1, "This Central European country lies between Czechia, Poland, Ukraine, Hungary and Austria.", "/images/countries/hints/slovakia.jpg", "/images/countries/flags/slovakia.svg", "Slovakia" },
                    { 38, "Ljubljana", 0, 2, "This small Alpine country is known for Lake Bled.", "/images/countries/hints/slovenia.jpg", "/images/countries/flags/slovenia.svg", "Slovenia" },
                    { 39, "Madrid", 0, 0, "This country is famous for flamenco, paella and the Sagrada Família.", "/images/countries/hints/spain.jpg", "/images/countries/flags/spain.svg", "Spain" },
                    { 40, "Stockholm", 0, 0, "This Nordic country is known for IKEA, ABBA and thousands of islands.", "/images/countries/hints/sweden.jpg", "/images/countries/flags/sweden.svg", "Sweden" },
                    { 41, "Bern", 0, 1, "This Alpine country is famous for chocolate, watches and neutrality.", "/images/countries/hints/switzerland.jpg", "/images/countries/flags/switzerland.svg", "Switzerland" },
                    { 42, "Kyiv", 0, 0, "This large Eastern European country is known for vast sunflower fields and the Carpathians.", "/images/countries/hints/ukraine.jpg", "/images/countries/flags/ukraine.svg", "Ukraine" },
                    { 43, "London", 0, 0, "This island state includes England, Scotland, Wales and Northern Ireland.", "/images/countries/hints/united_kingdom_of_great_britain_and_northern_ireland.jpg", "/images/countries/flags/united_kingdom_of_great_britain_and_northern_ireland.svg", "United Kingdom" },
                    { 44, "Vatican City", 0, 0, "This tiny independent state is the headquarters of the Roman Catholic Church.", "/images/countries/hints/vatican_city.jpg", "/images/countries/flags/vatican_city.svg", "Vatican City" },
                    { 45, "Kabul", 1, 0, "This landlocked country lies at the crossroads of Central and South Asia.", "/images/countries/hints/afghanistan.jpg", "/images/countries/flags/afghanistan.svg", "Afghanistan" },
                    { 46, "Yerevan", 1, 1, "This Caucasus country is associated with Mount Ararat and an ancient Christian heritage.", "/images/countries/hints/armenia.jpg", "/images/countries/flags/armenia.svg", "Armenia" },
                    { 47, "Baku", 1, 1, "This Caucasus country lies on the Caspian Sea and is known as the Land of Fire.", "/images/countries/hints/azerbaijan.jpg", "/images/countries/flags/azerbaijan.svg", "Azerbaijan" },
                    { 48, "Manama", 1, 2, "This small island kingdom lies in the Persian Gulf.", "/images/countries/hints/bahrain.jpg", "/images/countries/flags/bahrain.svg", "Bahrain" },
                    { 49, "Dhaka", 1, 1, "This densely populated South Asian country lies on the Ganges-Brahmaputra delta.", "/images/countries/hints/bangladesh.jpg", "/images/countries/flags/bangladesh.svg", "Bangladesh" },
                    { 50, "Thimphu", 1, 2, "This Himalayan kingdom is famous for measuring Gross National Happiness.", "/images/countries/hints/bhutan.jpg", "/images/countries/flags/bhutan.svg", "Bhutan" },
                    { 51, "Bandar Seri Begawan", 1, 2, "This small, oil-rich sultanate is located on the island of Borneo.", "/images/countries/hints/brunei.jpg", "/images/countries/flags/brunei.svg", "Brunei" },
                    { 52, "Phnom Penh", 1, 1, "This Southeast Asian country is home to Angkor Wat.", "/images/countries/hints/cambodia.jpg", "/images/countries/flags/cambodia.svg", "Cambodia" },
                    { 53, "Beijing", 1, 0, "This country is home to the Great Wall and has one of the world's largest populations.", "/images/countries/hints/china.jpg", "/images/countries/flags/china.svg", "China" },
                    { 54, "Nicosia", 1, 1, "This Mediterranean island is geographically in Western Asia and culturally linked with Europe.", "/images/countries/hints/cyprus.jpg", "/images/countries/flags/cyprus.svg", "Cyprus" },
                    { 55, "Tbilisi", 1, 1, "This Caucasus country is famous for an ancient wine-making tradition.", "/images/countries/hints/georgia.jpg", "/images/countries/flags/georgia.svg", "Georgia" },
                    { 56, "New Delhi", 1, 0, "This South Asian country is home to the Taj Mahal.", "/images/countries/hints/india.jpg", "/images/countries/flags/india.svg", "India" },
                    { 57, "Jakarta", 1, 0, "This enormous archipelago includes Java, Sumatra and Bali.", "/images/countries/hints/indonesia.jpg", "/images/countries/flags/indonesia.svg", "Indonesia" },
                    { 58, "Tehran", 1, 0, "This country was historically known as Persia.", "/images/countries/hints/iran.jpg", "/images/countries/flags/iran.svg", "Iran" },
                    { 59, "Baghdad", 1, 0, "This Middle Eastern country includes much of ancient Mesopotamia.", "/images/countries/hints/iraq.jpg", "/images/countries/flags/iraq.svg", "Iraq" },
                    { 60, "Jerusalem", 1, 1, "This Middle Eastern country lies on the eastern Mediterranean coast.", "/images/countries/hints/israel.jpg", "/images/countries/flags/israel.svg", "Israel" },
                    { 61, "Tokyo", 1, 0, "This island country is known for Mount Fuji, sushi and bullet trains.", "/images/countries/hints/japan.jpg", "/images/countries/flags/japan.svg", "Japan" },
                    { 62, "Amman", 1, 1, "This Middle Eastern country is home to the ancient city of Petra.", "/images/countries/hints/jordan.jpg", "/images/countries/flags/jordan.svg", "Jordan" },
                    { 63, "Astana", 1, 1, "This vast Central Asian country is the world's largest landlocked country.", "/images/countries/hints/kazakhstan.jpg", "/images/countries/flags/kazakhstan.svg", "Kazakhstan" },
                    { 64, "Kuwait City", 1, 1, "This small Gulf state is known for major oil reserves.", "/images/countries/hints/kuwait.jpg", "/images/countries/flags/kuwait.svg", "Kuwait" },
                    { 65, "Bishkek", 1, 2, "This mountainous Central Asian country is known for nomadic traditions and Issyk-Kul Lake.", "/images/countries/hints/kyrgyzstan.jpg", "/images/countries/flags/kyrgyzstan.svg", "Kyrgyzstan" },
                    { 66, "Vientiane", 1, 2, "This landlocked Southeast Asian country is crossed by the Mekong River.", "/images/countries/hints/laos.jpg", "/images/countries/flags/laos.svg", "Laos" },
                    { 67, "Beirut", 1, 1, "This Mediterranean country is famous for cedar trees and ancient Phoenician heritage.", "/images/countries/hints/lebanon.jpg", "/images/countries/flags/lebanon.svg", "Lebanon" },
                    { 68, "Kuala Lumpur", 1, 0, "This Southeast Asian country is split between the Malay Peninsula and Borneo.", "/images/countries/hints/malaysia.jpg", "/images/countries/flags/malaysia.svg", "Malaysia" },
                    { 69, "Malé", 1, 2, "This Indian Ocean country consists of coral atolls and is famous for overwater resorts.", "/images/countries/hints/maldives.jpg", "/images/countries/flags/maldives.svg", "Maldives" },
                    { 70, "Ulaanbaatar", 1, 1, "This vast landlocked country is associated with Genghis Khan and the Gobi Desert.", "/images/countries/hints/mongolia.jpg", "/images/countries/flags/mongolia.svg", "Mongolia" },
                    { 71, "Naypyidaw", 1, 2, "This Southeast Asian country was formerly commonly known as Burma.", "/images/countries/hints/myanmar.jpg", "/images/countries/flags/myanmar.svg", "Myanmar" },
                    { 72, "Kathmandu", 1, 1, "This Himalayan country is home to Mount Everest.", "/images/countries/hints/nepal.jpg", "/images/countries/flags/nepal.svg", "Nepal" },
                    { 73, "Pyongyang", 1, 1, "This country occupies the northern half of the Korean Peninsula.", "/images/countries/hints/north_korea.jpg", "/images/countries/flags/north_korea.svg", "North Korea" },
                    { 74, "Muscat", 1, 1, "This Arabian Peninsula country has a long coastline on the Arabian Sea.", "/images/countries/hints/oman.jpg", "/images/countries/flags/oman.svg", "Oman" },
                    { 75, "Islamabad", 1, 1, "This South Asian country is home to K2, the world's second-highest mountain.", "/images/countries/hints/pakistan.jpg", "/images/countries/flags/pakistan.svg", "Pakistan" },
                    { 76, "East Jerusalem", 1, 2, "This territory is located in the Levant and includes the West Bank and Gaza Strip.", "/images/countries/hints/palestine.jpg", "/images/countries/flags/palestine.svg", "Palestine" },
                    { 77, "Manila", 1, 0, "This Southeast Asian country is an archipelago of more than 7,000 islands.", "/images/countries/hints/philippines.jpg", "/images/countries/flags/philippines.svg", "Philippines" },
                    { 78, "Doha", 1, 0, "This small Gulf state hosted the 2022 FIFA World Cup.", "/images/countries/hints/qatar.jpg", "/images/countries/flags/qatar.svg", "Qatar" },
                    { 79, "Riyadh", 1, 0, "This Arabian Peninsula country is home to Mecca and Medina.", "/images/countries/hints/saudi_arabia.jpg", "/images/countries/flags/saudi_arabia.svg", "Saudi Arabia" },
                    { 80, "Singapore", 1, 0, "This city-state is one of the world's major financial and shipping hubs.", "/images/countries/hints/singapore.jpg", "/images/countries/flags/singapore.svg", "Singapore" },
                    { 81, "Seoul", 1, 0, "This country is known for K-pop, technology and kimchi.", "/images/countries/hints/south_korea.jpg", "/images/countries/flags/south_korea.svg", "South Korea" },
                    { 82, "Sri Jayawardenepura Kotte", 1, 2, "This island country lies just south of India and is famous for tea.", "/images/countries/hints/sri_lanka.jpg", "/images/countries/flags/sri_lanka.svg", "Sri Lanka" },
                    { 83, "Damascus", 1, 1, "This Middle Eastern country contains one of the world's oldest continuously inhabited cities.", "/images/countries/hints/syria.jpg", "/images/countries/flags/syria.svg", "Syria" },
                    { 84, "Dushanbe", 1, 2, "This mountainous Central Asian country is dominated by the Pamir Mountains.", "/images/countries/hints/tajikistan.jpg", "/images/countries/flags/tajikistan.svg", "Tajikistan" },
                    { 85, "Bangkok", 1, 0, "This Southeast Asian country is known for temples, tropical beaches and Thai cuisine.", "/images/countries/hints/thailand.jpg", "/images/countries/flags/thailand.svg", "Thailand" },
                    { 86, "Dili", 1, 2, "This young Southeast Asian nation occupies the eastern half of Timor island.", "/images/countries/hints/timor_leste.jpg", "/images/countries/flags/timor_leste.svg", "Timor-Leste" },
                    { 87, "Ankara", 1, 0, "This transcontinental country spans both Europe and Asia and is home to Istanbul.", "/images/countries/hints/turkiye.jpg", "/images/countries/flags/turkiye.svg", "Türkiye" },
                    { 88, "Ashgabat", 1, 2, "This Central Asian country is largely covered by the Karakum Desert.", "/images/countries/hints/turkmenistan.jpg", "/images/countries/flags/turkmenistan.svg", "Turkmenistan" },
                    { 89, "Abu Dhabi", 1, 0, "This Gulf federation includes Dubai and is known for modern skyscrapers.", "/images/countries/hints/united_arab_emirates.jpg", "/images/countries/flags/united_arab_emirates.svg", "United Arab Emirates" },
                    { 90, "Tashkent", 1, 1, "This Central Asian country is famous for Silk Road cities such as Samarkand.", "/images/countries/hints/uzbekistan.jpg", "/images/countries/flags/uzbekistan.svg", "Uzbekistan" },
                    { 91, "Hanoi", 1, 0, "This Southeast Asian country has a long S-shaped coastline.", "/images/countries/hints/vietnam.jpg", "/images/countries/flags/vietnam.svg", "Vietnam" },
                    { 92, "Sana'a", 1, 1, "This Arabian Peninsula country is home to the unique island of Socotra.", "/images/countries/hints/yemen.jpg", "/images/countries/flags/yemen.svg", "Yemen" },
                    { 93, "Algiers", 2, 1, "This North African country is the largest country in Africa by area.", "/images/countries/hints/algeria.jpg", "/images/countries/flags/algeria.svg", "Algeria" },
                    { 94, "Luanda", 2, 1, "This southwest African country has a long Atlantic coastline and major oil resources.", "/images/countries/hints/angola.jpg", "/images/countries/flags/angola.svg", "Angola" },
                    { 95, "Porto-Novo", 2, 2, "This West African country is considered one of the historic centers of Vodun.", "/images/countries/hints/benin.jpg", "/images/countries/flags/benin.svg", "Benin" },
                    { 96, "Gaborone", 2, 2, "This southern African country is known for the Okavango Delta.", "/images/countries/hints/botswana.jpg", "/images/countries/flags/botswana.svg", "Botswana" },
                    { 97, "Ouagadougou", 2, 2, "This landlocked West African country is known for a major pan-African film festival.", "/images/countries/hints/burkina_faso.jpg", "/images/countries/flags/burkina_faso.svg", "Burkina Faso" },
                    { 98, "Gitega", 2, 2, "This small East African country lies near Lake Tanganyika.", "/images/countries/hints/burundi.jpg", "/images/countries/flags/burundi.svg", "Burundi" },
                    { 99, "Praia", 2, 2, "This island country lies in the Atlantic Ocean west of Senegal.", "/images/countries/hints/cabo_verde.jpg", "/images/countries/flags/cabo_verde.svg", "Cabo Verde" },
                    { 100, "Yaoundé", 2, 2, "This Central African country is sometimes called 'Africa in miniature' because of its geographic diversity.", "/images/countries/hints/cameroon.jpg", "/images/countries/flags/cameroon.svg", "Cameroon" },
                    { 101, "Bangui", 2, 2, "This landlocked country lies near the geographic center of Africa.", "/images/countries/hints/central_african_republic.jpg", "/images/countries/flags/central_african_republic.svg", "Central African Republic" },
                    { 102, "N'Djamena", 2, 2, "This landlocked country is named after Lake Chad.", "/images/countries/hints/chad.jpg", "/images/countries/flags/chad.svg", "Chad" },
                    { 103, "Moroni", 2, 2, "This island nation lies in the Indian Ocean between Mozambique and Madagascar.", "/images/countries/hints/comoros.jpg", "/images/countries/flags/comoros.svg", "Comoros" },
                    { 104, "Kinshasa", 2, 1, "This huge Central African country contains much of the Congo rainforest.", "/images/countries/hints/dr_congo.jpg", "/images/countries/flags/dr_congo.svg", "Democratic Republic of the Congo" },
                    { 105, "Brazzaville", 2, 2, "This Central African country's capital faces Kinshasa across the Congo River.", "/images/countries/hints/congo.jpg", "/images/countries/flags/congo.svg", "Republic of the Congo" },
                    { 106, "Yamoussoukro", 2, 2, "This West African country is one of the world's leading cocoa producers.", "/images/countries/hints/cote_d_ivoire.jpg", "/images/countries/flags/cote_d_ivoire.svg", "Côte d'Ivoire" },
                    { 107, "Djibouti", 2, 1, "This small Horn of Africa country sits near one of the world's busiest shipping routes.", "/images/countries/hints/djibouti.jpg", "/images/countries/flags/djibouti.svg", "Djibouti" },
                    { 108, "Cairo", 2, 0, "This country is famous for the pyramids of Giza and the Nile River.", "/images/countries/hints/egypt.jpg", "/images/countries/flags/egypt.svg", "Egypt" },
                    { 109, "Malabo", 2, 2, "This small Central African country has both mainland and island territory.", "/images/countries/hints/equatorial_guinea.jpg", "/images/countries/flags/equatorial_guinea.svg", "Equatorial Guinea" },
                    { 110, "Asmara", 2, 2, "This Horn of Africa country has a long Red Sea coastline.", "/images/countries/hints/eritrea.jpg", "/images/countries/flags/eritrea.svg", "Eritrea" },
                    { 111, "Mbabane", 2, 2, "This small southern African kingdom is one of the world's remaining absolute monarchies.", "/images/countries/hints/eswatini.jpg", "/images/countries/flags/eswatini.svg", "Eswatini" },
                    { 112, "Addis Ababa", 2, 1, "This Horn of Africa country is associated with the origin of coffee.", "/images/countries/hints/ethiopia.jpg", "/images/countries/flags/ethiopia.svg", "Ethiopia" },
                    { 113, "Libreville", 2, 2, "This equatorial Central African country is heavily forested.", "/images/countries/hints/gabon.jpg", "/images/countries/flags/gabon.svg", "Gabon" },
                    { 114, "Banjul", 2, 2, "This narrow West African country follows the course of the Gambia River.", "/images/countries/hints/gambia.jpg", "/images/countries/flags/gambia.svg", "Gambia" },
                    { 115, "Accra", 2, 1, "This West African country was the first sub-Saharan African colony to gain independence in 1957.", "/images/countries/hints/ghana.jpg", "/images/countries/flags/ghana.svg", "Ghana" },
                    { 116, "Conakry", 2, 2, "This West African country has large bauxite reserves.", "/images/countries/hints/guinea.jpg", "/images/countries/flags/guinea.svg", "Guinea" },
                    { 117, "Bissau", 2, 2, "This small West African country includes the Bijagós Islands.", "/images/countries/hints/guinea-bissau.jpg", "/images/countries/flags/guinea-bissau.svg", "Guinea-Bissau" },
                    { 118, "Nairobi", 2, 0, "This East African country is famous for safari wildlife and the Great Rift Valley.", "/images/countries/hints/kenya.jpg", "/images/countries/flags/kenya.svg", "Kenya" },
                    { 119, "Maseru", 2, 2, "This mountain kingdom is completely surrounded by South Africa.", "/images/countries/hints/lesotho.jpg", "/images/countries/flags/lesotho.svg", "Lesotho" },
                    { 120, "Monrovia", 2, 2, "This West African country was founded in the 19th century by formerly enslaved people from the United States.", "/images/countries/hints/liberia.jpg", "/images/countries/flags/liberia.svg", "Liberia" },
                    { 121, "Tripoli", 2, 0, "This North African country is largely covered by the Sahara Desert.", "/images/countries/hints/libya.jpg", "/images/countries/flags/libya.svg", "Libya" },
                    { 122, "Antananarivo", 2, 2, "This large island is famous for unique wildlife such as lemurs.", "/images/countries/hints/madagascar.jpg", "/images/countries/flags/madagascar.svg", "Madagascar" },
                    { 123, "Lilongwe", 2, 2, "This southeastern African country is dominated by a large lake of the same name.", "/images/countries/hints/malawi.jpg", "/images/countries/flags/malawi.svg", "Malawi" },
                    { 124, "Bamako", 2, 1, "This West African country is home to the historic city of Timbuktu.", "/images/countries/hints/mali.jpg", "/images/countries/flags/mali.svg", "Mali" },
                    { 125, "Nouakchott", 2, 2, "Much of this West African country lies within the Sahara Desert.", "/images/countries/hints/mauritania.jpg", "/images/countries/flags/mauritania.svg", "Mauritania" },
                    { 126, "Port Louis", 2, 2, "This Indian Ocean island nation is famous for beaches and was once home to the dodo.", "/images/countries/hints/mauritius.jpg", "/images/countries/flags/mauritius.svg", "Mauritius" },
                    { 127, "Rabat", 2, 0, "This North African country is known for Marrakech, souks and the Atlas Mountains.", "/images/countries/hints/morocco.jpg", "/images/countries/flags/morocco.svg", "Morocco" },
                    { 128, "Maputo", 2, 1, "This southeast African country has a long Indian Ocean coastline.", "/images/countries/hints/mozambique.jpg", "/images/countries/flags/mozambique.svg", "Mozambique" },
                    { 129, "Windhoek", 2, 1, "This southern African country is home to the Namib Desert and giant sand dunes.", "/images/countries/hints/namibia.jpg", "/images/countries/flags/namibia.svg", "Namibia" },
                    { 130, "Niamey", 2, 2, "This large landlocked West African country is mostly covered by the Sahara.", "/images/countries/hints/niger.jpg", "/images/countries/flags/niger.svg", "Niger" },
                    { 131, "Abuja", 2, 1, "This West African country has Africa's largest population.", "/images/countries/hints/nigeria.jpg", "/images/countries/flags/nigeria.svg", "Nigeria" },
                    { 132, "Kigali", 2, 1, "This small East African country is known as the 'Land of a Thousand Hills'.", "/images/countries/hints/rwanda.jpg", "/images/countries/flags/rwanda.svg", "Rwanda" },
                    { 133, "São Tomé", 2, 2, "This island nation lies in the Gulf of Guinea near the equator.", "/images/countries/hints/sao_tome_and_principe.jpg", "/images/countries/flags/sao_tome_and_principe.svg", "São Tomé and Príncipe" },
                    { 134, "Dakar", 2, 1, "This West African country's capital sits on the Cap-Vert peninsula.", "/images/countries/hints/senegal.jpg", "/images/countries/flags/senegal.svg", "Senegal" },
                    { 135, "Victoria", 2, 2, "This Indian Ocean island nation is famous for granite beaches and giant tortoises.", "/images/countries/hints/seychelles.jpg", "/images/countries/flags/seychelles.svg", "Seychelles" },
                    { 136, "Freetown", 2, 2, "This West African country's capital was founded as a settlement for freed slaves.", "/images/countries/hints/sierra_leone.jpg", "/images/countries/flags/sierra_leone.svg", "Sierra Leone" },
                    { 137, "Mogadishu", 2, 1, "This Horn of Africa country has the longest mainland coastline in Africa.", "/images/countries/hints/somalia.jpg", "/images/countries/flags/somalia.svg", "Somalia" },
                    { 138, "Pretoria", 2, 1, "This southern African country is famous for wildlife, Table Mountain and having multiple capitals.", "/images/countries/hints/south_africa.jpg", "/images/countries/flags/south_africa.svg", "South Africa" },
                    { 139, "Juba", 2, 1, "This country became independent in 2011, making it the world's newest widely recognized state.", "/images/countries/hints/south_sudan.jpg", "/images/countries/flags/south_sudan.svg", "South Sudan" },
                    { 140, "Khartoum", 2, 1, "This northeast African country lies where the Blue and White Nile meet.", "/images/countries/hints/sudan.jpg", "/images/countries/flags/sudan.svg", "Sudan" },
                    { 141, "Dodoma", 2, 2, "This East African country is home to Mount Kilimanjaro and the Serengeti.", "/images/countries/hints/tanzania.jpg", "/images/countries/flags/tanzania.svg", "Tanzania" },
                    { 142, "Lomé", 2, 2, "This narrow West African country stretches from the Gulf of Guinea northward.", "/images/countries/hints/togo.jpg", "/images/countries/flags/togo.svg", "Togo" },
                    { 143, "Tunis", 2, 0, "This North African country contains the ruins of ancient Carthage.", "/images/countries/hints/tunisia.jpg", "/images/countries/flags/tunisia.svg", "Tunisia" },
                    { 144, "Kampala", 2, 1, "This East African country lies on the shores of Lake Victoria.", "/images/countries/hints/uganda.jpg", "/images/countries/flags/uganda.svg", "Uganda" },
                    { 145, "Lusaka", 2, 1, "This southern African country shares Victoria Falls with Zimbabwe.", "/images/countries/hints/zambia.jpg", "/images/countries/flags/zambia.svg", "Zambia" },
                    { 146, "Harare", 2, 1, "This southern African country is known for Great Zimbabwe and Victoria Falls.", "/images/countries/hints/zimbabwe.jpg", "/images/countries/flags/zimbabwe.svg", "Zimbabwe" },
                    { 147, "Saint John's", 3, 2, "This Caribbean nation consists mainly of two islands and is famous for beaches.", "/images/countries/hints/antigua_and_barbuda.jpg", "/images/countries/flags/antigua_and_barbuda.svg", "Antigua and Barbuda" },
                    { 148, "Nassau", 3, 1, "This Atlantic archipelago consists of hundreds of islands and cays.", "/images/countries/hints/bahamas.jpg", "/images/countries/flags/bahamas.svg", "Bahamas" },
                    { 149, "Bridgetown", 3, 1, "This Caribbean island is the birthplace of singer Rihanna.", "/images/countries/hints/barbados.jpg", "/images/countries/flags/barbados.svg", "Barbados" },
                    { 150, "Belmopan", 3, 2, "This Central American country has English as its official language.", "/images/countries/hints/belize.jpg", "/images/countries/flags/belize.svg", "Belize" },
                    { 151, "Ottawa", 3, 0, "This country is famous for maple syrup, hockey and vast wilderness.", "/images/countries/hints/canada.jpg", "/images/countries/flags/canada.svg", "Canada" },
                    { 152, "San José", 3, 1, "This Central American country is famous for biodiversity and has no standing army.", "/images/countries/hints/costa_rica.jpg", "/images/countries/flags/costa_rica.svg", "Costa Rica" },
                    { 153, "Havana", 3, 0, "This Caribbean island is known for classic cars, cigars and salsa music.", "/images/countries/hints/cuba.jpg", "/images/countries/flags/cuba.svg", "Cuba" },
                    { 154, "Roseau", 3, 2, "This mountainous Caribbean island is known as the 'Nature Island'.", "/images/countries/hints/dominica.jpg", "/images/countries/flags/dominica.svg", "Dominica" },
                    { 155, "Santo Domingo", 3, 1, "This Caribbean country shares the island of Hispaniola with Haiti.", "/images/countries/hints/dominican_republic.jpg", "/images/countries/flags/dominican_republic.svg", "Dominican Republic" },
                    { 156, "San Salvador", 3, 1, "This is the smallest country in mainland Central America.", "/images/countries/hints/el_salvador.jpg", "/images/countries/flags/el_salvador.svg", "El Salvador" },
                    { 157, "Saint George's", 3, 2, "This Caribbean island nation is known as the 'Spice Isle'.", "/images/countries/hints/grenada.jpg", "/images/countries/flags/grenada.svg", "Grenada" },
                    { 158, "Guatemala City", 3, 1, "This Central American country is famous for Maya heritage and volcanoes.", "/images/countries/hints/guatemala.jpg", "/images/countries/flags/guatemala.svg", "Guatemala" },
                    { 159, "Port-au-Prince", 3, 1, "This Caribbean country shares the island of Hispaniola with the Dominican Republic.", "/images/countries/hints/haiti.jpg", "/images/countries/flags/haiti.svg", "Haiti" },
                    { 160, "Tegucigalpa", 3, 2, "This Central American country is home to the Maya ruins of Copán.", "/images/countries/hints/honduras.jpg", "/images/countries/flags/honduras.svg", "Honduras" },
                    { 161, "Kingston", 3, 0, "This Caribbean island is strongly associated with reggae and Bob Marley.", "/images/countries/hints/jamaica.jpg", "/images/countries/flags/jamaica.svg", "Jamaica" },
                    { 162, "Mexico City", 3, 0, "This country is known for tacos, ancient Maya and Aztec sites, and Día de los Muertos.", "/images/countries/hints/mexico.jpg", "/images/countries/flags/mexico.svg", "Mexico" },
                    { 163, "Managua", 3, 1, "This Central American country is known for large lakes and volcanoes.", "/images/countries/hints/nicaragua.jpg", "/images/countries/flags/nicaragua.svg", "Nicaragua" },
                    { 164, "Panama City", 3, 0, "This country is famous for a canal connecting the Atlantic and Pacific Oceans.", "/images/countries/hints/panama.jpg", "/images/countries/flags/panama.svg", "Panama" },
                    { 165, "Basseterre", 3, 2, "This tiny Caribbean federation consists of two main islands.", "/images/countries/hints/saint_kitts_and_nevis.jpg", "/images/countries/flags/saint_kitts_and_nevis.svg", "Saint Kitts and Nevis" },
                    { 166, "Castries", 3, 2, "This Caribbean island is famous for the twin volcanic peaks called the Pitons.", "/images/countries/hints/saint_lucia.jpg", "/images/countries/flags/saint_lucia.svg", "Saint Lucia" },
                    { 167, "Kingstown", 3, 2, "This Caribbean state includes Saint Vincent and a chain of smaller Grenadine islands.", "/images/countries/hints/saint_vincent_and_the_grenadines.jpg", "/images/countries/flags/saint_vincent_and_the_grenadines.svg", "Saint Vincent and the Grenadines" },
                    { 168, "Port of Spain", 3, 1, "This Caribbean nation consists of two main islands and is famous for Carnival.", "/images/countries/hints/trinidad_and_tobago.jpg", "/images/countries/flags/trinidad_and_tobago.svg", "Trinidad and Tobago" },
                    { 169, "Washington, D.C.", 3, 0, "This country is home to landmarks such as the Statue of Liberty and the Grand Canyon.", "/images/countries/hints/united_states_of_america.jpg", "/images/countries/flags/united_states_of_america.svg", "United States" },
                    { 170, "Buenos Aires", 4, 0, "This country is famous for tango, beef and Patagonia.", "/images/countries/hints/argentina.jpg", "/images/countries/flags/argentina.svg", "Argentina" },
                    { 171, "Sucre", 4, 2, "This landlocked country contains Salar de Uyuni, the world's largest salt flat.", "/images/countries/hints/bolivia.jpg", "/images/countries/flags/bolivia.svg", "Bolivia" },
                    { 172, "Brasília", 4, 0, "This is South America's largest country and home to much of the Amazon rainforest.", "/images/countries/hints/brazil.jpg", "/images/countries/flags/brazil.svg", "Brazil" },
                    { 173, "Santiago", 4, 0, "This long, narrow country stretches along South America's Pacific coast.", "/images/countries/hints/chile.jpg", "/images/countries/flags/chile.svg", "Chile" },
                    { 174, "Bogotá", 4, 0, "This country is famous for coffee and has coastlines on both the Caribbean and Pacific.", "/images/countries/hints/colombia.jpg", "/images/countries/flags/colombia.svg", "Colombia" },
                    { 175, "Quito", 4, 1, "This country is named after the equator and includes the Galápagos Islands.", "/images/countries/hints/ecuador.jpg", "/images/countries/flags/ecuador.svg", "Ecuador" },
                    { 176, "Georgetown", 4, 2, "This South American country has English as its official language.", "/images/countries/hints/guyana.jpg", "/images/countries/flags/guyana.svg", "Guyana" },
                    { 177, "Asunción", 4, 1, "This landlocked country lies between Argentina, Brazil and Bolivia.", "/images/countries/hints/paraguay.jpg", "/images/countries/flags/paraguay.svg", "Paraguay" },
                    { 178, "Lima", 4, 0, "This country is home to Machu Picchu and part of the Andes Mountains.", "/images/countries/hints/peru.jpg", "/images/countries/flags/peru.svg", "Peru" },
                    { 179, "Paramaribo", 4, 2, "This small South American country has Dutch as its official language.", "/images/countries/hints/suriname.jpg", "/images/countries/flags/suriname.svg", "Suriname" },
                    { 180, "Montevideo", 4, 1, "This small country lies between Argentina and Brazil on the Atlantic coast.", "/images/countries/hints/uruguay.jpg", "/images/countries/flags/uruguay.svg", "Uruguay" },
                    { 181, "Caracas", 4, 0, "This country is home to Angel Falls, the world's highest uninterrupted waterfall.", "/images/countries/hints/venezuela.jpg", "/images/countries/flags/venezuela.svg", "Venezuela" },
                    { 182, "Canberra", 5, 0, "This country is famous for kangaroos, the Great Barrier Reef and the Outback.", "/images/countries/hints/australia.jpg", "/images/countries/flags/australia.svg", "Australia" },
                    { 183, "Suva", 5, 1, "This Pacific island nation consists of more than 300 islands.", "/images/countries/hints/fiji.jpg", "/images/countries/flags/fiji.svg", "Fiji" },
                    { 184, "South Tarawa", 5, 2, "This Pacific country spans all four hemispheres and consists mainly of low-lying atolls.", "/images/countries/hints/kiribati.jpg", "/images/countries/flags/kiribati.svg", "Kiribati" },
                    { 185, "Majuro", 5, 2, "This Pacific island country includes Bikini Atoll.", "/images/countries/hints/marshall_islands.jpg", "/images/countries/flags/marshall_islands.svg", "Marshall Islands" },
                    { 186, "Palikir", 5, 2, "This Pacific federation consists of four states spread across many islands.", "/images/countries/hints/micronesia.jpg", "/images/countries/flags/micronesia.svg", "Micronesia" },
                    { 187, "Yaren", 5, 2, "This tiny Pacific island country became wealthy from phosphate mining.", "/images/countries/hints/nauru.jpg", "/images/countries/flags/nauru.svg", "Nauru" },
                    { 188, "Wellington", 5, 0, "This island country is known for Māori culture and dramatic landscapes featured in The Lord of the Rings.", "/images/countries/hints/new_zealand.jpg", "/images/countries/flags/new_zealand.svg", "New Zealand" },
                    { 189, "Ngerulmud", 5, 2, "This Pacific island country is famous for its Rock Islands and marine biodiversity.", "/images/countries/hints/palau.jpg", "/images/countries/flags/palau.svg", "Palau" },
                    { 190, "Port Moresby", 5, 1, "This country is one of the world's most linguistically diverse.", "/images/countries/hints/papua_new_guinea.jpg", "/images/countries/flags/papua_new_guinea.svg", "Papua New Guinea" },
                    { 191, "Apia", 5, 1, "This Polynesian island nation lies in the South Pacific.", "/images/countries/hints/samoa.jpg", "/images/countries/flags/samoa.svg", "Samoa" },
                    { 192, "Honiara", 5, 2, "This Melanesian island country was the site of major battles during World War II.", "/images/countries/hints/solomon_islands.jpg", "/images/countries/flags/solomon_islands.svg", "Solomon Islands" },
                    { 193, "Nukuʻalofa", 5, 2, "This Polynesian kingdom is one of the few Pacific nations never formally colonized.", "/images/countries/hints/tonga.jpg", "/images/countries/flags/tonga.svg", "Tonga" },
                    { 194, "Funafuti", 5, 2, "This tiny Pacific nation consists of low-lying coral islands and atolls.", "/images/countries/hints/tuvalu.jpg", "/images/countries/flags/tuvalu.svg", "Tuvalu" },
                    { 195, "Port Vila", 5, 2, "This Pacific island nation is known for active volcanoes and traditional kastom culture.", "/images/countries/hints/vanuatu.jpg", "/images/countries/flags/vanuatu.svg", "Vanuatu" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 121);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 122);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 123);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 126);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 127);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 131);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 132);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 136);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 139);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 143);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 144);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 146);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 148);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 149);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 150);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 151);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 152);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 153);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 154);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 155);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 156);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 157);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 158);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 159);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 160);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 161);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 162);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 163);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 164);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 165);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 166);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 167);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 168);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 169);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 170);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 171);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 172);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 173);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 174);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 175);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 176);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 177);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 178);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 179);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 180);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 181);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 182);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 183);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 184);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 185);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 186);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 187);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 188);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 189);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 190);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 191);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 192);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 193);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 194);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 195);
        }
    }
}
