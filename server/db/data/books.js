// Books Catalog Data (6 subcategories)
module.exports = [
  {
    cat: 'Books', sub: 'Fiction', gender: 'Unisex', gst: 0,
    sizes: ['Paperback', 'Hardcover', 'Collector\'s Edition'], colors: ['Standard Print'],
    items: [
      { b: 'Bloomsbury', n: 'Harry Potter and the Philosopher\'s Stone 25th Anniversary Edition', p: 399, m: 599 },
      { b: 'Penguin', n: 'The Alchemist by Paulo Coelho International Bestseller', p: 275, m: 399 },
      { b: 'HarperCollins', n: 'The Midnight Library by Matt Haig Sunday Times Bestseller', p: 349, m: 499 },
      { b: 'Rupa', n: 'One Indian Girl by Chetan Bhagat Popular Fiction', p: 175, m: 250 },
      { b: 'Penguin', n: 'To Kill a Mockingbird 60th Anniversary Edition Harper Lee', p: 310, m: 450 },
      { b: 'HarperCollins', n: 'The Silent Patient Psychological Thriller by Alex Michaelides', p: 299, m: 499 },
      { b: 'Vintage', n: 'Norwegian Wood by Haruki Murakami Modern Classic', p: 389, m: 550 },
      { b: 'Penguin', n: '1984 by George Orwell Dystopian Masterpiece Unabridged', p: 149, m: 225 },
      { b: 'HarperCollins', n: 'The Kite Runner 10th Anniversary Edition by Khaled Hosseini', p: 349, m: 499 },
      { b: 'Penguin', n: 'Life of Pi Illustrated Edition by Yann Martel', p: 299, m: 450 }
    ]
  },
  {
    cat: 'Books', sub: 'Non-fiction', gender: 'Unisex', gst: 0,
    sizes: ['Paperback', 'Hardcover', 'Export Edition'], colors: ['Standard Print'],
    items: [
      { b: 'Penguin', n: 'Atomic Habits: An Easy & Proven Way to Build Good Habits James Clear', p: 449, m: 799 },
      { b: 'HarperCollins', n: 'The Psychology of Money: Timeless Lessons on Wealth Morgan Housel', p: 285, m: 399 },
      { b: 'Penguin', n: 'Sapiens: A Brief History of Humankind by Yuval Noah Harari', p: 419, m: 699 },
      { b: 'Juggernaut', n: 'Ikigai: The Japanese Secret to a Long and Happy Life', p: 315, m: 550 },
      { b: 'Westland', n: 'Do Epic Shit by Ankur Warikoo Life & Entrepreneurship Guide', p: 260, m: 399 },
      { b: 'Penguin', n: 'Thinking, Fast and Slow by Daniel Kahneman Nobel Laureate', p: 465, m: 699 },
      { b: 'HarperCollins', n: 'Rich Dad Poor Dad by Robert T. Kiyosaki Financial Classic', p: 320, m: 499 },
      { b: 'Crown', n: 'Deep Work: Rules for Focused Success in a Distracted World Cal Newport', p: 350, m: 599 },
      { b: 'Penguin', n: 'Wings of Fire: An Autobiography of A.P.J. Abdul Kalam', p: 275, m: 395 },
      { b: 'HarperCollins', n: 'Think and Grow Rich Deluxe Edition Napoleon Hill', p: 199, m: 299 }
    ]
  },
  {
    cat: 'Books', sub: 'Programming', gender: 'Unisex', gst: 0,
    sizes: ['Paperback', 'Kindle Guide Edition'], colors: ['Technical Print'],
    items: [
      { b: 'O\'Reilly Media', n: 'Python Crash Course, 3rd Edition: A Hands-On Project-Based Intro', p: 1299, m: 1899 },
      { b: 'O\'Reilly Media', n: 'Designing Data-Intensive Applications: The Big Ideas Behind Reliable Systems', p: 1499, m: 2199 },
      { b: 'Pearson', n: 'Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin', p: 699, m: 999 },
      { b: 'No Starch Press', n: 'Automate the Boring Stuff with Python, 2nd Edition Al Sweigart', p: 1150, m: 1699 },
      { b: 'O\'Reilly Media', n: 'JavaScript: The Definitive Guide 7th Edition by David Flanagan', p: 1599, m: 2399 },
      { b: 'Packt', n: 'Mastering React 18: Build Scalable Web Apps with Next.js & TypeScript', p: 1399, m: 1999 },
      { b: 'Wiley', n: 'Data Structures and Algorithms in Java 6th Edition Goodrich', p: 799, m: 1199 },
      { b: 'Addison-Wesley', n: 'The Pragmatic Programmer: Your Journey To Mastery 20th Anniversary', p: 1299, m: 1799 },
      { b: 'Addison-Wesley', n: 'Refactoring: Improving the Design of Existing Code Martin Fowler', p: 1499, m: 2199 },
      { b: 'O\'Reilly Media', n: 'Fluent Python: Clear, Concise, and Effective Programming Luciano Ramalho', p: 1699, m: 2499 }
    ]
  },
  {
    cat: 'Books', sub: 'Engineering', gender: 'Unisex', gst: 0,
    sizes: ['Student Edition Paperback', 'Hardbound'], colors: ['Academic Print'],
    items: [
      { b: 'McGraw Hill', n: 'Higher Engineering Mathematics 44th Edition by Dr. B.S. Grewal', p: 789, m: 995 },
      { b: 'Pearson', n: 'Engineering Mechanics: Statics & Dynamics 14th Edition R.C. Hibbeler', p: 899, m: 1250 },
      { b: 'Wiley', n: 'Fundamentals of Physics Extended 10th Edition Halliday & Resnick', p: 999, m: 1499 },
      { b: 'S. Chand', n: 'A Textbook of Electrical Technology Volume 1 B.L. Theraja', p: 585, m: 750 },
      { b: 'McGraw Hill', n: 'Mechanical Engineering Design 11th Edition Shigley', p: 1099, m: 1599 },
      { b: 'Pearson', n: 'Computer Networks 5th Edition by Andrew S. Tanenbaum', p: 749, m: 999 },
      { b: 'Oxford', n: 'Electric Machinery and Power System Fundamentals Stephen Chapman', p: 699, m: 950 },
      { b: 'CRC Press', n: 'Introduction to Algorithms 4th Edition CLRS Comprehensive Guide', p: 1699, m: 2499 },
      { b: 'McGraw Hill', n: 'Control Systems Engineering 8th Edition Norman S. Nise', p: 899, m: 1295 },
      { b: 'Wiley', n: 'Materials Science and Engineering: An Introduction William D. Callister', p: 999, m: 1450 }
    ]
  },
  {
    cat: 'Books', sub: 'Competitive Exams', gender: 'Unisex', gst: 0,
    sizes: ['Latest Revised Edition', 'Solved Papers Set'], colors: ['Exam Edition'],
    items: [
      { b: 'Arihant', n: 'Objective General English for All Competitive Exams by S.P. Bakshi', p: 295, m: 395 },
      { b: 'S. Chand', n: 'Quantitative Aptitude for Competitive Examinations R.S. Aggarwal', p: 569, m: 775 },
      { b: 'S. Chand', n: 'A Modern Approach to Verbal & Non-Verbal Reasoning R.S. Aggarwal', p: 620, m: 850 },
      { b: 'McGraw Hill', n: 'Indian Polity 7th Edition for UPSC Civil Services by M. Laxmikanth', p: 699, m: 995 },
      { b: 'Disha', n: '29 Years UPSC IAS/IPS Prelims Topic-wise Solved Papers (1995-2023)', p: 449, m: 650 },
      { b: 'Oswaal', n: 'CBSE 10 Previous Years\' Solved Papers Class 12 Science Stream', p: 499, m: 699 },
      { b: 'Arihant', n: 'Handbook of Physics, Chemistry & Mathematics Formulae for JEE Main', p: 325, m: 450 },
      { b: 'Kiran', n: 'SSC CGL Tier I & II Chapterwise Solved Mathematics Papers', p: 420, m: 595 }
    ]
  },
  {
    cat: 'Books', sub: 'Children\'s Books', gender: 'Unisex', gst: 0,
    sizes: ['Illustrated Hardback', 'Picture Paperback'], colors: ['Full Colour Illustrated'],
    items: [
      { b: 'Amar Chitra Katha', n: 'Mahabharata 3-Volume Boxed Collector Set (Special Illustrated)', p: 1499, m: 2200 },
      { b: 'Scholastic', n: 'Geronimo Stilton: The Kingdom of Fantasy Full Colour Hardcover', p: 399, m: 599 },
      { b: 'Puffin', n: 'The Blue Umbrella by Ruskin Bond Illustrated Children\'s Classic', p: 140, m: 199 },
      { b: 'Ladybird', n: 'Peppa Pig: Fairy Tale Little Library Set of 4 Board Books', p: 299, m: 450 },
      { b: 'Scholastic', n: 'The Bad Guys Episode 1 by Aaron Blabey Bestselling Graphic Novel', p: 245, m: 350 },
      { b: 'Puffin', n: 'Charlie and the Chocolate Factory by Roald Dahl Quentin Blake Art', p: 275, m: 399 },
      { b: 'Wonder House', n: '101 Panchatantra Stories with Moral Lessons for Kids', p: 185, m: 299 },
      { b: 'Amar Chitra Katha', n: 'Tales of Birbal & Akbar Humorous Illustrated Stories', p: 199, m: 275 }
    ]
  }
];
