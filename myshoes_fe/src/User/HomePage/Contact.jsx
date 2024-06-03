import {
  Button,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Contact = () => {
  return (
    <div>
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center text-black">
            <Typography variant="h4">LIÊN HỆ</Typography>
            <Typography variant="h2" className="my-3">
              Nhắn tin để biết thông tin chi tiết!!
            </Typography>
            <Typography variant="small">
              Hoàn thành biểu mẫu này và chúng tôi sẽ liên hệ lại với bạn sau 24
              giờ.
            </Typography>
          </div>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Họ tên" />
              <Input variant="outlined" size="lg" label="Địa chỉ email" />
            </div>
            <Textarea variant="outlined" size="lg" label="Lời nhắn" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  Tôi đồng ý với
                  <a
                    href="#"
                    className="font-medium transition-colors text-blue-500 hover:text-[#DD5746]"
                  >
                    &nbsp;các điều khoản sử dụng
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Gửi tin nhắn
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
