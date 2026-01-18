import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../Services/ApiService";
import {
  Loader2,
  ShieldCheck,
  ShieldX,
  User,
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  Hash
} from "lucide-react";

const CertificateVarification = () => {
  const { verify } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const res = await ApiService.get(
          `/api/certificate/verify/${verify}`
        );
        setResult(res);
      } catch (err) {
        setError("Invalid or fake certificate");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [verify]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        Verifying certificate...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <ShieldX className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <h2 className="text-lg font-semibold text-red-600">
            Certificate Not Valid
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            This certificate does not exist in our records.
          </p>
        </div>
      </div>
    );
  }

  const cert = result.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-green-600">
            Certificate Verified
          </h2>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" />
            <b>Name:</b> {cert.name}
          </p>

          <p className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-500" />
            <b>Course:</b> {cert.course}
          </p>

          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <b>Duration:</b> {cert.duration}
          </p>

          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <b>Start Date:</b> {new Date(cert.startDate).toDateString()}
          </p>

          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <b>End Date:</b> {new Date(cert.endDate).toDateString()}
          </p>

          <p className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-slate-500" />
            <b>Manager:</b> {cert.manager}
          </p>

          <p className="flex items-center gap-2 pt-3 text-xs text-slate-500 border-t">
            <Hash className="w-3 h-3" />
            Certificate ID: {cert.certificateId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CertificateVarification