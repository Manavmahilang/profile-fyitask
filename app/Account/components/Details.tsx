import React from 'react';

const Details = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-10 ">
            <div className="max-w-4xl mx-auto">
                <section className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 pt-20">Tech Stack</h1>
                    <p className="text-lg">
                        I have built this application using a modern stack, including:
                    </p>
                    <ul className="list-disc list-inside mt-4 text-lg">
                        <li>
                            <strong>Next.js</strong> .
                        </li>
                        <li>
                            <strong>Prisma ORM</strong>
                        </li>
                        <li>
                            <strong>PostgreSQL</strong>
                        </li>
                        <li>
                            <strong>Vercel</strong> 
                        </li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Features Built</h1>
                    <p className="text-lg">
                        This project includes several features:
                    </p>
                    <ul className="list-disc list-inside mt-4 text-lg">
                        <li>The <strong>Homepage</strong> – The main entry point of the application.</li>
                        <li>The <strong>Cart Page</strong> – A page to manage and view the items in the cart.</li>
                        <li>Google <strong>Sign-In</strong> – Allows users to sign in using their Google account.</li>
                        <li>Email <strong>Notification System</strong> – Utilizes <strong>Resend</strong> for handling email notifications. Please note that a domain verification is required to fully test the mailing system, which is pending due to a lack of a free domain.(the emails are being sent its just i am the reciever)</li>
                    
                    </ul>
                </section>


            </div>
        </div>
    );
};

export default Details;
