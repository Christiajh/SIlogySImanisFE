import React, { useState, useEffect } from 'react';
import { User, Shield, Leaf, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import "../styles/Forgot.css"; // Pastikan path ini benar
import axiosInstance from "../services/axios"; // Import axiosInstance

const securityQuestions = [
    'Nama hewan peliharaan pertama?',
    'Kota kelahiran?',
    'Makanan favorit masa kecil?',
    'Nama guru favorit Anda di sekolah dasar?',
    'Nama guru favorit?',
];

const WargaBantuin = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (securityQuestions.length > 0) {
            setSelectedQuestion(securityQuestions[0]);
        }
    }, []);

    const validateUsername = (username) => {
        return username.trim().length > 0;
    };

    const validatePassword = (password) => {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);
    };

    const handleSendReset = async () => {
        const newErrors = {};

        if (!validateUsername(username)) {
            newErrors.username = 'Username tidak boleh kosong';
        }
        if (!selectedQuestion) {
            newErrors.selectedQuestion = 'Pilih pertanyaan keamanan Anda';
        }
        if (!securityAnswer.trim()) {
            newErrors.securityAnswer = 'Jawaban keamanan tidak boleh kosong';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = await axiosInstance.post('/verify-account', {
                    username,
                    securityAnswer,
                    selectedQuestion
                });

                setUserId(response.data.userId);
                setStep(2);
                setErrors({});
            } catch (error) {
                console.error('Error during account verification:', error);
                if (error.response && error.response.data && error.response.data.msg) {
                    setErrors({ general: error.response.data.msg });
                } else if (error.request) {
                    setErrors({ general: 'Tidak ada respons dari server. Periksa koneksi Anda.' });
                } else {
                    setErrors({ general: 'Terjadi kesalahan tidak terduga. Mohon coba lagi.' });
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleResetPassword = async () => {
        const newErrors = {};

        if (!validatePassword(newPassword)) {
            newErrors.newPassword = 'Password harus minimal 8 karakter dengan huruf besar, kecil, angka, dan simbol';
        }
        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                await axiosInstance.post('/reset-password', {
                    userId,
                    newPassword
                });

                setSuccess(true);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } catch (error) {
                console.error('Error resetting password:', error);
                if (error.response && error.response.data && error.response.data.msg) {
                    setErrors({ general: error.response.data.msg });
                } else if (error.request) {
                    setErrors({ general: 'Tidak ada respons dari server. Periksa koneksi Anda.' });
                } else {
                    setErrors({ general: 'Terjadi kesalahan tidak terduga. Mohon coba lagi.' });
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (success) {
        return (
            <div className="wb-container success-state">
                <div className="wb-success-modal">
                    <div className="wb-success-content">
                        <CheckCircle className="wb-success-icon" />
                        <h2 className="wb-success-title">Password Berhasil Direset!</h2>
                        <p className="wb-success-text">Anda akan dialihkan ke halaman login dalam 3 detik...</p>
                    </div>
                    <div className="wb-success-footer">
                        <Leaf className="wb-leaf-icon" />
                        <span>Bersama menjaga bumi lebih hijau 🌱</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wb-container">
            {/* Background Elements */}
            <div className="wb-bg-elements">
                <div className="wb-floating-leaf leaf-1"></div>
                <div className="wb-floating-leaf leaf-2"></div>
                <div className="wb-floating-leaf leaf-3"></div>
                <div className="wb-floating-leaf leaf-4"></div>
                <div className="wb-floating-leaf leaf-5"></div>
                <div className="wb-floating-leaf leaf-6"></div>
                <div className="wb-earth-orbit"></div>
                <div className="wb-earth-orbit-2"></div>
            </div>

            <div className="wb-card">
                {/* Header */}
                <div className="wb-header">
                    <div className="wb-header-content">
                        <div className="wb-logo-section">
                            <div className="wb-logo-icon">
                                <Leaf className="wb-leaf-logo" />
                            </div>
                            <h1 className="wb-app-title">WargaBantuin</h1>
                        </div>
                        <p className="wb-app-subtitle">Menjaga Lingkungan & Bumi Lebih Sehat</p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="wb-progress-section">
                    <div className="wb-progress-steps">
                        {[1, 2].map((num) => (
                            <div key={num} className="wb-step-item">
                                <div className={`wb-step-circle ${step >= num ? 'active' : ''}`}>
                                    {num}
                                </div>
                                {num < 2 && <div className={`wb-step-line ${step > num ? 'active' : ''}`} />}
                            </div>
                        ))}
                    </div>
                    <div className="wb-step-labels">
                        <span>Verifikasi Akun</span>
                        <span>Password Baru</span>
                    </div>
                </div>

                <div className="wb-content">
                    {/* Step 1: Username and Security Question */}
                    {step === 1 && (
                        <div className="wb-step-content">
                            <div className="wb-step-header">
                                <Shield className="wb-step-icon" />
                                <h2 className="wb-step-title">Lupa Password?</h2>
                                <p className="wb-step-description">Verifikasi akun Anda dengan mengisi username dan jawaban pertanyaan keamanan.</p>
                            </div>

                            {errors.general && <p className="wb-error-text wb-align-center"><AlertCircle size={18} /> {errors.general}</p>}

                            {/* Username Input */}
                            <div className="wb-input-group">
                                <label className="wb-input-label">Username</label>
                                <div className="wb-input-with-icon">
                                    <User className="wb-input-icon" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Masukkan username Anda"
                                        className="wb-input-field"
                                    />
                                </div>
                                {errors.username && <p className="wb-error-text"><AlertCircle size={18} /> {errors.username}</p>}
                            </div>

                            {/* Security Question */}
                            <div className="wb-input-group">
                                <label className="wb-input-label">Pertanyaan Keamanan</label>
                                <select
                                    value={selectedQuestion}
                                    onChange={(e) => setSelectedQuestion(e.target.value)}
                                    className="wb-input-field wb-select-field"
                                >
                                    <option value="" disabled>Pilih pertanyaan keamanan Anda</option>
                                    {securityQuestions.map((q, index) => (
                                        <option key={index} value={q}>{q}</option>
                                    ))}
                                </select>
                                {errors.selectedQuestion && <p className="wb-error-text"><AlertCircle size={18} /> {errors.selectedQuestion}</p>}
                            </div>

                            {/* Security Answer Input */}
                            <div className="wb-input-group">
                                <label className="wb-input-label">Jawaban Anda</label>
                                <input
                                    type="text"
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                    placeholder="Masukkan jawaban keamanan Anda"
                                    className="wb-input-field"
                                />
                                {errors.securityAnswer && <p className="wb-error-text"><AlertCircle size={18} /> {errors.securityAnswer}</p>}
                            </div>

                            <button
                                onClick={handleSendReset}
                                disabled={isLoading || !selectedQuestion}
                                className="wb-primary-button"
                            >
                                {isLoading ? (
                                    <div className="wb-loading-spinner"></div>
                                ) : (
                                    <>
                                        <Send className="wb-button-icon" />
                                        Verifikasi Akun
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Step 2: New Password */}
                    {step === 2 && (
                        <div className="wb-step-content">
                            <div className="wb-step-header">
                                <div className="wb-step-icon-container">
                                    <Shield className="wb-step-icon" />
                                </div>
                                <h2 className="wb-step-title">Password Baru</h2>
                                <p className="wb-step-description">Buat password baru yang aman untuk akun Anda</p>
                            </div>

                            {errors.general && <p className="wb-error-text wb-align-center"><AlertCircle size={18} /> {errors.general}</p>}


                            {/* New Password Input */}
                            <div className="wb-input-group">
                                <label className="wb-input-label">Password Baru</label>
                                <div className="wb-password-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        className="wb-password-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="wb-password-toggle"
                                    >
                                        {showPassword ? <EyeOff className="wb-eye-icon" /> : <Eye className="wb-eye-icon" />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="wb-error-text"><AlertCircle size={18} /> {errors.newPassword}</p>}
                            </div>

                            {/* Confirm New Password Input */}
                            <div className="wb-input-group">
                                <label className="wb-input-label">Konfirmasi Password</label>
                                <div className="wb-password-container">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Ketik ulang password"
                                        className="wb-password-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="wb-password-toggle"
                                    >
                                        {showConfirmPassword ? <EyeOff className="wb-eye-icon" /> : <Eye className="wb-eye-icon" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="wb-error-text"><AlertCircle size={18} /> {errors.confirmPassword}</p>}
                            </div>

                            {/* Password Requirements */}
                            <div className="wb-password-requirements">
                                <p className="wb-requirements-title">Password harus memiliki:</p>
                                <div className="wb-requirements-list">
                                    {[
                                        { text: 'Minimal 8 karakter', valid: newPassword.length >= 8 },
                                        { text: 'Huruf besar (A-Z)', valid: /[A-Z]/.test(newPassword) },
                                        { text: 'Huruf kecil (a-z)', valid: /[a-z]/.test(newPassword) },
                                        { text: 'Angka (0-9)', valid: /[0-9]/.test(newPassword) },
                                        { text: 'Simbol (!@#$%)', valid: /[^A-Za-z0-9]/.test(newPassword) }
                                    ].map((req, index) => (
                                        <div key={index} className="wb-requirement-item">
                                            {req.valid ? (
                                                <CheckCircle className="wb-requirement-icon valid" />
                                            ) : (
                                                <AlertCircle className="wb-requirement-icon invalid" />
                                            )}
                                            <span className={`wb-requirement-text ${req.valid ? 'valid' : 'invalid'}`}>
                                                {req.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="wb-button-group">
                                <button
                                    onClick={() => setStep(1)}
                                    className="wb-secondary-button"
                                >
                                    <ArrowLeft className="wb-button-icon" />
                                    Kembali
                                </button>
                                <button
                                    onClick={handleResetPassword}
                                    disabled={isLoading}
                                    className="wb-primary-button"
                                >
                                    {isLoading ? (
                                        <div className="wb-loading-spinner"></div>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="wb-footer">
                    <div className="wb-footer-content">
                        <Leaf className="wb-footer-leaf" />
                        <span>Bersama menjaga bumi lebih hijau 🌱</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WargaBantuin;