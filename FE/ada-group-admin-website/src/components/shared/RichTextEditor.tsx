"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";

// Link's mark defaults to `inclusive: true` (tied to its `autolink` option), which makes it
// keep swallowing newly typed characters at the cursor until a line break. Force it off so
// typing right after a link produces plain text instead of extending the link.
const LinkExtension = Link.extend({
  inclusive: false,
});
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Button } from "@/src/components/ui/button";

const CONTENT_CLASS =
  "min-h-33 px-4 py-4 text-sm text-[#1C1B1B] outline-none " +
  "[&_h1]:mt-2 [&_h1]:mb-1 [&_h1]:text-2xl [&_h1]:font-semibold " +
  "[&_h2]:mt-2 [&_h2]:mb-1 [&_h2]:text-xl [&_h2]:font-semibold " +
  "[&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:text-lg [&_h3]:font-semibold " +
  "[&_p]:mb-2 [&_p:last-child]:mb-0 " +
  "[&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 " +
  "[&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 " +
  "[&_li]:mb-1 " +
  "[&_a]:text-[#316EE9] [&_a]:underline " +
  "[&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-lg";

function ToolbarButton({
  active,
  disabled,
  onClick,
  children,
  label,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-7 items-center justify-center rounded disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-[#E5E7EB] text-[#1C1B1B]" : "text-[#434750] hover:bg-[#EEECEB]"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-[#C4C6D2]" />;
}

function LinkButton({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  function handleOpenChange(next: boolean) {
    if (next) setUrl((editor.getAttributes("link").href as string) ?? "");
    setOpen(next);
  }

  function handleApply() {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setOpen(false);
      return;
    }

    const { from, to } = editor.state.selection;
    if (from === to) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: trimmedUrl,
          marks: [{ type: "link", attrs: { href: trimmedUrl } }],
        })
        .unsetMark("link")
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: trimmedUrl })
        .setTextSelection(to)
        .unsetMark("link")
        .run();
    }

    setOpen(false);
  }

  function handleRemove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        aria-label="Chèn liên kết"
        className={`flex size-7 items-center justify-center rounded outline-none ${
          editor.isActive("link")
            ? "bg-[#E5E7EB] text-[#1C1B1B]"
            : "text-[#434750] hover:bg-[#EEECEB]"
        }`}
      >
        <Link2 className="size-3.5" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#1C1B1B]">
            Đường dẫn liên kết
          </label>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleApply();
              }
            }}
            placeholder="https://..."
            autoFocus
            className="h-9 rounded-lg border border-[#C4C6D2] px-3 text-sm text-[#1C1B1B] outline-none focus-visible:border-[#316EE9]"
          />
          <p className="text-xs text-[#6B7280]">
            Nhấn Enter hoặc &quot;Áp dụng&quot; để hoàn tất.
          </p>
          <div className="flex justify-end gap-2 pt-1">
            {editor.isActive("link") && (
              <Button type="button" variant="outline" size="sm" onClick={handleRemove}>
                Gỡ liên kết
              </Button>
            )}
            <Button type="button" size="sm" onClick={handleApply}>
              Áp dụng
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ImageButton({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const url = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <ToolbarButton
        label="Chèn hình ảnh"
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon className="size-3.5" />
      </ToolbarButton>
    </>
  );
}

export type RichTextEditorVariant = "full" | "basic";

function Toolbar({
  editor,
  variant,
}: {
  editor: Editor;
  variant: RichTextEditorVariant;
}) {
  function paragraphValue() {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    return "p";
  }

  function handleParagraphChange(value: string) {
    if (value === "p") editor.chain().focus().setParagraph().run();
    else {
      const level = Number(value.slice(1)) as 1 | 2 | 3;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[#C4C6D2] bg-[#F6F3F2] p-2">
      <select
        value={paragraphValue()}
        onChange={(event) => handleParagraphChange(event.target.value)}
        className="h-7 rounded border-none bg-transparent px-1 text-sm text-[#434750] outline-none"
      >
        <option value="p">Đoạn</option>
        <option value="h1">Tiêu đề 1</option>
        <option value="h2">Tiêu đề 2</option>
        <option value="h3">Tiêu đề 3</option>
      </select>

      <Divider />

      <ToolbarButton
        label="In đậm"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="In nghiêng"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Gạch ngang"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-3.5" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Danh sách"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Danh sách có thứ tự"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-3.5" />
      </ToolbarButton>
      {variant === "full" && (
        <>
          <Divider />

          <ToolbarButton
            label="Căn trái"
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            label="Căn giữa"
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            label="Căn phải"
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            label="Căn đều"
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <LinkButton editor={editor} />
          <ImageButton editor={editor} />
        </>
      )}

      <Divider />

      <ToolbarButton
        label="Hoàn tác"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Làm lại"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="size-3.5" />
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  variant = "full",
}: {
  value: string;
  onChange: (html: string) => void;
  variant?: RichTextEditorVariant;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: CONTENT_CLASS,
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  const wordCount = editor.getText().trim()
    ? editor.getText().trim().split(/\s+/).length
    : 0;

  return (
    <div className="overflow-hidden rounded-lg border border-[#C4C6D2]">
      <Toolbar editor={editor} variant={variant} />
      <EditorContent editor={editor} />
      <div className="flex justify-end border-t border-[#C4C6D2] bg-[#F6F3F2] px-3 py-1">
        <span className="text-xs text-[#434750]">{wordCount} từ</span>
      </div>
    </div>
  );
}
