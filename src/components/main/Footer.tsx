import { Server } from "lucide-react";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left justify-items-center md:justify-items-start">
                    <div>
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <Server className="h-6 w-6 text-emerald-400 mr-2" />
                            <span className="text-xl font-bold font-serif">Haloja Cloud</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Reliable hosting solutions for WordPress and CMS platforms worldwide.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 font-serif">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    WordPress Hosting
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Drupal Hosting
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Custom CMS
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Migration Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 font-serif">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Status Page
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 font-serif">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Haloja Cloud. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}