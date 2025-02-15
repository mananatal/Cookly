# Project Name: Cookly 


## Project Summary:
Cookly is an innovative recipe generation platform designed to transform your cooking experience. By leveraging the power of AI, Cookly allows users to generate personalized recipes tailored to their preferences, dietary restrictions, and available ingredients. Whether you're an amateur cook or a culinary expert, Cookly offers inspiration and guidance to create delightful dishes effortlessly.


## Key Features of **Cookly**

1. **AI-Powered Recipe Generation**: Generate custom recipes based on available ingredients and dietary preferences, ensuring a personalized cooking experience.

2. **Ingredient Detection via Photo Upload**: Automatically detect available ingredients by uploading a photo.

3. **Filter Recipes**: Use various filters to find recipes that meet specific criteria.

4. **Save Recipes**: Save your favorite recipes for quick access later.

5. **Nutritional Information**: Provides detailed nutritional information for each recipe to help users make informed choices.

6. **Rating Feature**: Allows users to rate recipes uploaded by others, enhancing the community experience.

7. **Responsive Design**: Ensures an intuitive and user-friendly interface across all devices, from mobile phones to desktops.


## Approach Documentation

### 1. Authentication
- Implemented user authentication using **Clerk**.  
- Used Clerk Webhooks to sync registered users with the database, ensuring seamless integration and consistent user data.

### 2. Ingredient Recognition
- Integrated the **Gemini API** to recognize ingredients from uploaded images.  
- When a user uploads an image, the API extracts the content and populates the ingredient list automatically.

### 3. Recipe Matching Algorithm
- Used the **Gemini API** to generate recipes based on:  
  - The provided ingredient list.  
  - Dietary preferences specified by the user.  
  - The desired number of servings.  
- The API returns three diverse recipes, each with detailed instructions, ingredients, and nutritional information.

### 4. Ingredient Validation
- Validated the ingredient list by sending it to the Gemini API.  
- If unusual or uncommon ingredients are detected, or if they conflict with dietary preferences, they are replaced with valid alternatives.  
- Users are notified to recheck the updated ingredient list.

### 5. Dietary Restrictions Handling
- Provided users with predefined options for dietary preferences, including:  
  - Vegetarian, Vegan, Gluten-Free, Lactose-Free, Keto, and Paleo.  
- The generated recipes strictly adhere to the selected dietary restrictions.

### 6. User Experience
- Designed a clean, intuitive, and mobile-responsive interface.  
- Added filters for cooking time, difficulty, and dietary preferences.  
- Enabled users to save recipes from other users.
- Integrated a rating system, allowing users to rate recipes.  
- Included toast notifications to inform users of the success or failure of their actions.

### 7. Error Handling
- Displayed user-friendly error messages for invalid inputs or ingredients.  
- Implemented loading states to ensure a smooth and seamless user experience.

### 8. Hosting
- Deployed the project on **Vercel** for free and reliable hosting.  
- Ensured the application is accessible and performs well across devices.



## Technology Stack

- **Next.js**: A React-based framework for building server-side rendered (SSR) and static web applications.
- **MongoDB**: A NoSQL database for storing and managing application data.
- **Gemini API**: A powerful API for integrating Google services and artificial intelligence capabilities.
- **Clerk Authentication**: A service for adding user authentication and management features to your web application.

## Live Demo
[Smart Recipe Generator](https://cookly-lac.vercel.app/)



## Installation
1. **Clone the Repository**:  
   `git clone https://github.com/mananatal/Cookly.git`

2. **Navigate to the Project Directory**:  
   `cd Cookly`

3. **Install Dependencies**:  
   `npm install`

4. **Start the Development Server**:  
   `npm run dev`



## Environment Variables

To run Cookly, you will need to configure the following environment variables in a `.env` file at the root of the project:

- **MONGODB_URL**: Connection URI for your MongoDB database.
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Publishable key for Clerk authentication.
- **CLERK_SECRET_KEY**: Secret key for Clerk authentication.
- **NEXT_PUBLIC_CLERK_SIGN_IN_URL**: URL for Clerk sign-in page.
- **NEXT_PUBLIC_CLERK_SIGN_UP_URL**: URL for Clerk sign-up page.
- **NEXT_PUBLIC_GOOGLE_API_KEY**: Gemini API key for Google services.
- **SIGNING_SECRET**: Clerk webhook secret key for secure signing.
- **NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL**: Fallback redirect URL after sign-in.
- **NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL**: Fallback redirect URL after sign-up.


## Example `.env` file

```plaintext
MONGODB_URL=mongodb+srv://username:password@cluster0.mongodb.net/dbname
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_clerk_sign_in_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_clerk_sign_up_url
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key
SIGNING_SECRET=your_clerk_webhook_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=your_sign_in_fallback_redirect_url
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=your_sign_up_fallback_redirect_url
```

## Usage

1. Set up MongoDB and ensure the service is running.

2. Configure the `.env` file with the required variables.

3. Start the development server using the provided start script.



## Contributing:
Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

## Feedback and Contact:
I welcome any feedback or suggestions for improving this project. If you have questions, ideas, or just want to connect, feel free to reach out to me via email at [mananatal25@gmail.com](mailto:mananatal25@gmail.com) or through my [GitHub profile](https://github.com/mananatal).

Thank you for your interest in Cookly!

