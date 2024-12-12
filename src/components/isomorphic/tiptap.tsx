"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading3,
  Heading4,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

interface TiptapProps {
  content: string;
  onChange?: (html: string) => void;
}

const CustomTextAlign = TextAlign.extend({
  addAttributes() {
    return {
      textAlign: {
        default: "left",
        parseHTML: (element: HTMLElement) => element.style.textAlign || "left",
        renderHTML: (attributes: { textAlign: string }) => {
          const align = attributes.textAlign;
          if (align === "justify-left") {
            return {
              class: "whitespace-normal",
              style:
                "text-align: justify; text-align-last: left; white-space: normal;",
            };
          }
          if (align === "justify-right") {
            return {
              class: "whitespace-normal",
              style:
                "text-align: justify; text-align-last: right; white-space: normal;",
            };
          }
          return {
            style: `text-align: ${align}`,
          };
        },
      },
    };
  },
});

export const Tiptap = ({ content = "", onChange }: TiptapProps) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-0 pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "ml-0 pl-5 [&>li]:pl-0 [counter-reset:list-counter]",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "my-2 ml-0",
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer hover:text-blue-700",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        validate: (url) => /^https?:\/\//.test(url),
      }),
      CustomTextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: [
          "left",
          "center",
          "right",
          "justify",
          "justify-left",
          "justify-right",
        ],
        defaultAlignment: "left",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] [&_ol]:ml-0 [&_ul]:ml-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:pl-5 [&_ol>li]:pl-0 [&_ul>li]:pl-0",
      },
    },
    onUpdate: ({ editor }) => {
      // console.log("Content updated:", editor.getHTML()); // Debug log
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const setLink = () => {
    const url = linkUrl.trim();
    const urlWithProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;

    if (urlWithProtocol === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: urlWithProtocol })
      .run();
  };

  const handleLinkSubmit = () => {
    setLink();
    setIsLinkDialogOpen(false);
    setLinkUrl("");
  };

  return (
    <div className="rounded-lg border">
      <div className="flex flex-wrap gap-1 rounded-t-lg border-b bg-white p-2">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => {
            // console.log("Strike toggled"); // Debug log
            editor.chain().focus().toggleStrike().run();
            // console.log("After strike:", editor.getHTML()); // Debug log
          }}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <div className="mx-1 h-8 w-px bg-gray-200" />

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 4 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Heading4 className="h-4 w-4" />
        </Toggle>

        <div className="mx-1 h-8 w-px bg-gray-200" />

        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={toggleBulletList}
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={toggleOrderedList}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <div className="mx-1 h-8 w-px bg-gray-200" />

        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={() => setIsLinkDialogOpen(true)}
        >
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        <div className="mx-1 h-8 w-px bg-gray-200" />

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <div className="mx-1 h-8 w-px bg-gray-200" />

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </div>

      <EditorContent
        editor={editor}
        className="prose p-4 prose-p:text-base prose-p:text-slate-500 prose-li:text-sm [&_.ProseMirror]:pl-0"
      />

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLinkSubmit();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsLinkDialogOpen(false);
                setLinkUrl("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleLinkSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
